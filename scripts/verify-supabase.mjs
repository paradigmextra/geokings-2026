import { createHash, randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import pg from 'pg';
import sharp from 'sharp';
import certificate from '../supabase/ca.json' with {type:'json'};
const origin=process.argv[2] || process.env.TEST_ORIGIN || 'http://localhost:3000';
if(!process.env.DATABASE_URL?.startsWith('postgres'))throw new Error('Supabase DATABASE_URL required.');
const database=new pg.Client({connectionString:process.env.DATABASE_URL,ssl:{ca:certificate.ca,rejectUnauthorized:true}});
await database.connect();
const suffix=randomUUID();
const emails=[`buyer-${suffix}@example.test`,`seller-${suffix}@example.test`];
const password='Verification-only-'+randomUUID();
const userIds=[];const propertyIds=[];let adminCookie='';
async function request(route,method='GET',data,cookie='',status=200,admin=false){
 const multipart=data instanceof FormData;
 const r=await fetch(`${origin}/api/${route}`,{method,signal:AbortSignal.timeout(60000),headers:{Origin:origin,...(!multipart?{'Content-Type':'application/json'}:{}),Cookie:cookie,'X-Geoking-Portal':admin?'admin':'client'},...(data?{body:multipart?data:JSON.stringify(data)}:{})});
 let result;try{result=await r.json();}catch{throw new Error(`${method} ${route}: server returned HTTP ${r.status} instead of JSON`);}assert.equal(r.status,status,`${method} ${route}: ${JSON.stringify(result)}`);
 return {result,cookie:r.headers.get('set-cookie')?.split(';')[0] || cookie};
}
const photo=await sharp({create:{width:960,height:720,channels:3,background:'#18867f'}}).webp().toBuffer();
const listing={title:'Verification property '+suffix,location:'Lilongwe',type:'Land',description:'Temporary test listing used to verify seller submission and administrator approval.',price:1000,status:'draft'};
function form(photos=2,description=listing.description){const data=new FormData();Object.entries({...listing,description}).forEach(([k,v])=>data.set(k,String(v)));for(let i=0;i<photos;i++)data.append('photos',new Blob([photo],{type:'image/webp'}),`test-${i}.webp`);return data;}
try{
 const admin=await request('auth/login','POST',{identifier:process.env.ADMIN_USERNAME || 'admin',password:process.env.ADMIN_PASSWORD},'',200,true);adminCookie=admin.cookie;
 const buyer=await request('auth/register','POST',{name:'Verification Buyer',email:emails[0],password,accountType:'buyer',role:'admin'});userIds.push(buyer.result.user.id);assert.equal(buyer.result.user.role,'client');
 const seller=await request('auth/register','POST',{name:'Verification Seller',email:emails[1],password,accountType:'seller'});userIds.push(seller.result.user.id);
 await request('auth/register','POST',{name:'Duplicate',email:emails[0],password,accountType:'buyer'},'',409);
 console.log('Accounts registered; checking administrator visibility.');
 const users=(await request('dashboard','GET',null,adminCookie,200,true)).result.users;assert.ok(userIds.every(id=>users.some(u=>u.id===id)));assert.ok(users.every(u=>!('password' in u)));
 await request('admin/properties','POST',listing,buyer.cookie,401);
 await request('seller/properties','POST',form(),buyer.cookie,403);
 await request('seller/properties','POST',form(),seller.cookie,403);
 const kyc=new FormData();kyc.set('idNumber','TEST-ONLY-'+suffix);kyc.set('phone','+265999000000');kyc.set('address','Temporary verification address, Lilongwe');kyc.set('document',new Blob([photo],{type:'image/png'}),'test-id.png');
 await request('seller/kyc','POST',kyc,seller.cookie);
 const document=await fetch(`${origin}/api/admin/kyc/${seller.result.user.id}/document`,{headers:{Cookie:adminCookie}});assert.equal(document.status,200);assert.equal((await document.arrayBuffer()).byteLength,photo.length);
 assert.equal((await fetch(`${origin}/api/admin/kyc/${seller.result.user.id}/document`,{headers:{Cookie:buyer.cookie}})).status,401);
 await request(`admin/kyc/${seller.result.user.id}`,'PUT',{status:'approved'},adminCookie,200,true);
 await request('seller/properties','POST',form(7),seller.cookie,400);
 await request('seller/properties','POST',form(1,'word '.repeat(301)),seller.cookie,400);
 console.log('KYC and upload limits verified; creating photo listing.');
 const created=await request('seller/properties','POST',form(),seller.cookie,201);const id=created.result.id;propertyIds.push(id);
 let catalogue=(await request('properties')).result.properties;assert.ok(!catalogue.some(p=>p.id===id));
 const own=(await request('dashboard','GET',null,seller.cookie)).result.myListings.find(p=>p.id===id);assert.equal(own.approval_status,'pending');assert.equal(own.photos.length,2);
 assert.equal((await fetch(origin+own.image)).status,404);
 const ownerPhoto=await fetch(origin+own.image,{headers:{Cookie:seller.cookie}});assert.equal(ownerPhoto.status,200);assert.equal(ownerPhoto.headers.get('content-type'),'image/webp');
 await request(`admin/properties/${id}/approval`,'PUT',{approvalStatus:'approved'},adminCookie,200,true);
 await request(`admin/properties/${id}/approval`,'PUT',{approvalStatus:'rejected'},adminCookie,409,true);
 catalogue=(await request('properties')).result.properties;assert.ok(catalogue.some(p=>p.id===id && p.photos.length===2));assert.equal((await fetch(origin+own.image)).status,200);
 console.log('Listing approval and photo access verified.');
 await request(`saved/${id}`,'POST',null,buyer.cookie);await request(`saved/${id}`,'POST',null,buyer.cookie);assert.equal((await request('dashboard','GET',null,buyer.cookie)).result.saved.filter(p=>p===id).length,1);
 await request('payments/checkout','POST',{propertyId:id},seller.cookie,403);
 if(!process.env.PAYCHANGU_SECRET_KEY)await request('payments/checkout','POST',{propertyId:id},buyer.cookie,503);
 await request('contact','POST',{subject:'Verification enquiry '+suffix,message:'A temporary enquiry to verify that contact messages reach the administrator.'},buyer.cookie,201);
 const message=(await request('dashboard','GET',null,adminCookie,200,true)).result.messages.find(m=>m.user_id===buyer.result.user.id);assert.ok(message);
 await request(`admin/contact/${message.id}`,'PUT',{reply:'Test reply visible only in the correct client account.'},adminCookie,200,true);
 assert.ok((await request('dashboard','GET',null,buyer.cookie)).result.messages.some(m=>m.id===message.id && m.reply));
 assert.ok(!(await request('dashboard','GET',null,seller.cookie)).result.messages.some(m=>m.id===message.id));
 const rejected=await request('seller/properties','POST',form(1),seller.cookie,201);propertyIds.push(rejected.result.id);await request(`admin/properties/${rejected.result.id}/approval`,'PUT',{approvalStatus:'rejected'},adminCookie,200,true);assert.ok(!(await request('properties')).result.properties.some(p=>p.id===rejected.result.id));
 const denial=await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+'/rest/v1/users?select=id',{headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}});assert.ok([401,403].includes(denial.status),'Publishable key must not read private users');
 console.log('PASS: Supabase registration, buyer/seller visibility, protected roles, private KYC, photo validation & storage, pending/approved/rejected listings, photo access, favourites, contact replies, and anonymous database denial. Payment checkout correctly waits for credentials.');
}finally{
 const records=(await database.query('SELECT storage_key FROM property_images WHERE property_id=ANY($1::text[])',[propertyIds])).rows;
 const kyc=(await database.query('SELECT kyc_document_key FROM users WHERE id=ANY($1::text[])',[userIds])).rows;
 for(const [bucket,keys] of [['geoking-properties',records.map(row=>row.storage_key)],['geoking-kyc',kyc.map(row=>row.kyc_document_key).filter(Boolean)]]){
  for(const key of keys){const r=await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/'+bucket+'/'+key,{method:'DELETE',headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+process.env.SUPABASE_SERVICE_ROLE_KEY}});assert.ok(r.ok,'Fixture storage cleanup failed');}
 }
 await database.query('DELETE FROM saved_properties WHERE user_id=ANY($1::text[])',[userIds]);
 await database.query('DELETE FROM property_images WHERE property_id=ANY($1::text[])',[propertyIds]);
 await database.query('DELETE FROM properties WHERE id=ANY($1::text[])',[propertyIds]);
 await database.query('DELETE FROM contact_messages WHERE user_id=ANY($1::text[])',[userIds]);
 await database.query('DELETE FROM users WHERE id=ANY($1::text[])',[userIds]);
 const keys=emails.map(email=>'auth:'+email).concat(userIds.map(id=>'contact:'+id)).map(s=>createHash('sha256').update(s).digest('hex'));
 await database.query('DELETE FROM rate_limits WHERE key=ANY($1::text[])',[keys]);
 if(adminCookie)await request('auth/logout','POST',null,adminCookie,200,true).catch(()=>undefined);
 await database.end();
 console.log('Temporary verification accounts, listings, messages and uploaded files removed.');
}

import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createClient } from '@libsql/client';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const directory = await mkdtemp(path.join(tmpdir(),'geoking-test-'));
const port = 3107;
const origin = `http://localhost:${port}`;
const database = createClient({url:`file:${path.join(directory,'test.db').replaceAll('\\','/')}`});
const server = spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{env:{...process.env,DATABASE_URL:`file:${path.join(directory,'test.db').replaceAll('\\','/')}`,APP_URL:origin,PAYCHANGU_SECRET_KEY:'',PAYCHANGU_WEBHOOK_SECRET:''},stdio:['ignore','pipe','pipe'],windowsHide:true});
let output='';server.stdout.on('data',s=>output+=s);server.stderr.on('data',s=>output+=s);
async function request(route,method='GET',data,cookie='',expected=200,customOrigin=origin,portal='client') {
  const response=await fetch(`${origin}/api/${route}`,{method,headers:{'Content-Type':'application/json',Origin:customOrigin,Cookie:cookie,'X-Geoking-Portal':portal},...(data?{body:JSON.stringify(data)}:{})});
  const result=await response.json();assert.equal(response.status,expected,`${method} ${route}: ${JSON.stringify(result)}`);
  return {result,cookie:response.headers.get('set-cookie')?.split(';')[0]||cookie};
}
try {
  let started=false;
  for(let i=0;i<80;i++) {try{const r=await fetch(`${origin}/api/auth/me`);if(r.ok){started=true;break;}}catch{} await new Promise(r=>setTimeout(r,500));}
  assert.ok(started,output);
  const password='Integration-only-pass-2026';
  const adminId=randomUUID();
  await database.execute({sql:"INSERT INTO users(id,name,email,password,role) VALUES(?,?,?,?,?)",args:[adminId,'Test Admin','admin@example.test',await hash(password,12),'admin']});
  await request('dashboard','GET',undefined,'',401);
  await request('auth/register','POST',{name:'Client One',email:'client@example.test',password},'',403,'https://untrusted.test');
  const client=await request('auth/register','POST',{name:'Client One',email:'client@example.test',password,accountType:'buyer',role:'admin'});
  assert.equal(client.result.user.role,'client');
  assert.ok(client.cookie.includes('geoking_client_session='));
  await request('auth/register','POST',{name:'Client One',email:'CLIENT@example.test',password,accountType:'buyer'},'',409);
  const seller=await request('auth/register','POST',{name:'Seller One',email:'seller@example.test',password,accountType:'seller'});
  await request('auth/login','POST',{identifier:'client@example.test',password:'wrong-password-123'},'',401);
  const admin=await request('auth/login','POST',{identifier:'admin@example.test',password},'',200,origin,'admin');
  assert.ok(admin.cookie.includes('geoking_admin_session='));
  await request('auth/me','GET',undefined,admin.cookie,200,origin,'client').then(({result}) => assert.equal(result.user,null));
  const bothCookies=`${admin.cookie}; ${client.cookie}`;
  assert.equal((await request('auth/me','GET',undefined,bothCookies,200,origin,'admin')).result.user.role,'admin');
  assert.equal((await request('auth/me','GET',undefined,bothCookies,200,origin,'client')).result.user.role,'client');
  await request('admin/properties','POST',{},client.cookie,401);
  const listing={title:'Integration test property',location:'Lilongwe',type:'Land',description:'A test listing for isolated verification only.',price:1000,image:'/assets/property-land.jpg',status:'draft'};
  await request('admin/properties','POST',listing,admin.cookie,201,origin,'admin');
  assert.equal((await request('properties')).result.properties.length,0);
  const dashboard=(await request('dashboard','GET',undefined,admin.cookie,200,origin,'admin')).result;
  assert.equal(dashboard.users.filter(u=>u.role==='client').length,2);
  const id=dashboard.properties[0].id;
  await request(`admin/properties/${id}`,'PUT',{...listing,status:'available'},admin.cookie,200,origin,'admin');
  assert.equal((await request('properties')).result.properties.length,1);
  await request('seller/properties','POST',listing,seller.cookie,403);
  await database.execute({sql:"UPDATE users SET kyc_id_number=?,kyc_phone=?,kyc_address=?,kyc_document_key=?,kyc_document_type=?,kyc_status='pending' WHERE id=?",args:['TEST-ID-12345','+265999000000','Test address, Lilong','kyc/test/document.jpg','image/jpeg',seller.result.user.id]});
  await request(`admin/kyc/${seller.result.user.id}`,'PUT',{status:'approved'},admin.cookie,200,origin,'admin');
  const sellerLogin=await request('auth/login','POST',{identifier:'seller@example.test',password},'',200,origin,'client');
  await request('seller/properties','POST',listing,sellerLogin.cookie,201);
  assert.equal((await request('properties')).result.properties.length,1);
  const refreshedAdmin=(await request('dashboard','GET',undefined,admin.cookie,200,origin,'admin')).result;
  const sellerProperty=refreshedAdmin.properties.find(p=>p.owner_user_id===seller.result.user.id);
  assert.equal(sellerProperty.approval_status,'pending');
  await request(`admin/properties/${sellerProperty.id}/approval`,'PUT',{approvalStatus:'approved'},admin.cookie,200,origin,'admin');
  assert.equal((await request('properties')).result.properties.length,2);
  const changedPassword='Changed-integration-pass-2026';
  await request('account/password','PUT',{currentPassword:'incorrect',newPassword:changedPassword},sellerLogin.cookie,400);
  await request('account/password','PUT',{currentPassword:password,newPassword:changedPassword},sellerLogin.cookie);
  await request('auth/login','POST',{identifier:'seller@example.test',password},'',401);
  await request('auth/login','POST',{identifier:'seller@example.test',password:changedPassword});
  await request(`saved/${id}`,'POST',undefined,client.cookie);
  assert.equal((await request('dashboard','GET',undefined,client.cookie)).result.saved[0],id);
  await request('payments/checkout','POST',{propertyId:id,amount:1},client.cookie,503);
  await request('payments/webhook','POST',{tx_ref:randomUUID()},'',401);
  await request(`admin/users/${adminId}`,'DELETE',undefined,admin.cookie,403,origin,'admin');
  await request(`admin/users/${client.result.user.id}`,'DELETE',undefined,admin.cookie,200,origin,'admin');
  await request(`admin/users/${seller.result.user.id}`,'DELETE',undefined,admin.cookie,200,origin,'admin');
  await request('dashboard','GET',undefined,client.cookie,401);
  await request('auth/login','POST',{identifier:'client@example.test',password},'',401);
  await request(`admin/properties/${id}`,'DELETE',undefined,admin.cookie,200,origin,'admin');
  await request(`admin/properties/${sellerProperty.id}`,'DELETE',undefined,admin.cookie,200,origin,'admin');
  assert.equal((await request('properties')).result.properties.length,0);
  await request('auth/logout','POST',undefined,admin.cookie,200,origin,'admin');
  await request('dashboard','GET',undefined,admin.cookie,401,origin,'admin');
  for(const page of ['/','/admin','/client','/properties','/services/valuation'])assert.equal((await fetch(origin+page)).status,200);
  console.log('PASS: buyer/seller registration, isolated login, KYC approval, seller listing moderation, password change, property CRUD, visibility, favourites, payments, account deletion, logout, and direct routes.');
} finally {
  if(server.exitCode===null) { const exited=new Promise(resolve=>server.once('exit',resolve)); server.kill(); await exited; }
  database.close();
  await rm(directory,{recursive:true,force:true,maxRetries:10,retryDelay:200});
}


import { useEffect, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { countWords, MAX_DESCRIPTION_WORDS, MAX_PROPERTY_PHOTOS, MAX_PHOTO_BYTES } from '../../content/listing-limits';
export type ListingInput = { id?: string; title: string; location: string; type: string; description: string; price: number; image: string; status: string };
export default function PropertyEditor({ initial, admin, busy, save }: { initial: ListingInput; admin: boolean; busy: boolean; save: (value: ListingInput, files: File[]) => Promise<void> }) {
  const [value, setValue] = useState(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [processing,setProcessing]=useState(false);
  useEffect(() => { const urls = files.map(file => URL.createObjectURL(file)); setPreviews(urls); return () => urls.forEach(url => URL.revokeObjectURL(url)); }, [files]);
  const words = countWords(value.description);
  const field = 'mt-2 w-full rounded-xl border bg-white px-3 py-3 text-sm font-normal';
  return <form className="space-y-5" onSubmit={async event => { event.preventDefault(); setError(''); if (words > MAX_DESCRIPTION_WORDS) { setError('Keep your description within 300 words.'); return; } if (!admin && !files.length) { setError('Add at least one property photo.'); return; } await save(value, files); }}>
    <label className="block text-sm font-medium">Property title<Input required minLength={3} maxLength={100} placeholder="e.g. Three-bedroom home in Area 43" value={value.title} onChange={e => setValue({...value,title:e.target.value})} className={field}/></label>
    <label className="block text-sm font-medium">Location<Input required minLength={3} maxLength={150} placeholder="Area, town or district" value={value.location} onChange={e => setValue({...value,location:e.target.value})} className={field}/></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Property type<select className={field} value={value.type} onChange={e => setValue({...value,type:e.target.value})}>{['House','Land','Commercial'].map(type => <option key={type}>{type}</option>)}</select></label><label className="text-sm font-medium">Price (MWK)<Input type="number" required min={1} max={999999999} step={1} placeholder="Full asking price" className={field} value={value.price || ''} onChange={e => setValue({...value,price:Number(e.target.value)})}/></label></div>
    <label className="block text-sm font-medium">Description<textarea required minLength={10} maxLength={3000} rows={5} placeholder="Describe the property, its features, access and nearby amenities." className={field} value={value.description} aria-describedby="description-limit" onChange={e => setValue({...value,description:e.target.value})}/><span id="description-limit" className={`mt-2 block text-xs ${words > MAX_DESCRIPTION_WORDS ? 'text-destructive' : 'text-muted-foreground'}`}>{words} / 300 words · maximum 3,000 characters</span></label>
    {!initial.id && <div><label className="block text-sm font-medium" htmlFor="listing-photos">Property photos <span className="text-muted-foreground">{admin ? '(optional)' : '(required)'}</span></label><div className="mt-2 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5"><ImagePlus className="mb-3 text-primary" size={26}/><Input id="listing-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple required={!admin && !files.length} onChange={async e => { const input=e.currentTarget; const selected=Array.from(input.files || []); if(selected.length>MAX_PROPERTY_PHOTOS || selected.some(file => file.size>MAX_PHOTO_BYTES)) {setError('Select up to 6 photos, each 3 MB or smaller.');input.value='';return;}setProcessing(true);setError('');try {const prepared:File[]=[];for(const file of selected)prepared.push(await preparePhoto(file));setFiles(prepared);}catch(error){setError((error as Error).message);input.value='';}finally{setProcessing(false);} }} className="h-auto border-0 p-0 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2"/><p className="mt-3 text-xs leading-relaxed text-muted-foreground">1–6 JPG, PNG or WebP photos. Up to 3 MB each, at least 640 × 480 pixels and no more than 20 megapixels. The first photo is your cover; images are resized automatically.</p></div>{previews.length>0 && <div className="mt-3 grid grid-cols-3 gap-2">{previews.map((url,index)=><div key={url} className="relative"><img src={url} alt={`Selected property photo ${index+1}`} className="aspect-[4/3] w-full rounded-xl object-cover"/><button type="button" aria-label={`Remove photo ${index+1}`} onClick={()=>setFiles(files.filter((_,i)=>i!==index))} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-white text-secondary"><X size={15}/></button>{index===0 && <span className="absolute bottom-1 left-1 rounded bg-secondary px-2 py-1 text-[10px] text-white">Cover</span>}</div>)}</div>}</div>}
    {admin && <label className="block text-sm font-medium">Visibility<select className={field} value={value.status} onChange={e => setValue({...value,status:e.target.value})}><option value="draft">Draft</option><option value="available">Available for purchase</option></select></label>}
    {!admin && <p className="rounded-xl bg-primary/5 p-3 text-xs leading-relaxed text-secondary">Your property is sent to Geoking for review. Buyers will see it after an administrator approves the listing.</p>}
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy || processing || words>MAX_DESCRIPTION_WORDS} className="h-12 w-full">{processing ? 'Preparing photos…' : busy ? 'Saving property…' : admin ? 'Save property' : 'Submit for approval'}</Button>
  </form>;
}

async function preparePhoto(file:File) {
  const bitmap=await createImageBitmap(file);
  try {
    if(bitmap.width<640 || bitmap.height<480 || bitmap.width*bitmap.height>20000000)throw new Error('Photos must be at least 640 × 480 pixels and up to 20 megapixels.');
    const scale=Math.min(1,2000/bitmap.width,1600/bitmap.height);
    const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
    const context=canvas.getContext('2d');if(!context)throw new Error('Photo preparation is unavailable. Please try another browser.');
    context.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('This photo could not be prepared.')),'image/webp',.82));
    return new File([blob],file.name.replace(/\.[^.]+$/,'')+'.webp',{type:blob.type});
  } finally {bitmap.close();}
}

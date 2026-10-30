import { useState } from 'react';
import type { Property } from '../lib/portal-types';
export default function PropertyGallery({ property }: { property: Property }) {
  const [active,setActive]=useState(0);
  const photos=property.photos?.length ? property.photos : [property.image];
  return <div><img src={photos[active] || photos[0]} alt={`${property.title}, photo ${active+1}`} className="aspect-[4/3] max-h-96 w-full rounded-xl bg-muted object-cover"/>{photos.length>1 && <div className="mt-3 grid grid-cols-6 gap-2">{photos.map((src,index)=><button type="button" key={src} aria-label={`View photo ${index+1}`} aria-pressed={active===index} onClick={()=>setActive(index)} className={`overflow-hidden rounded-lg border-2 ${active===index?'border-primary':'border-transparent'}`}><img src={src} alt="" className="aspect-square w-full object-cover"/></button>)}</div>}</div>;
}

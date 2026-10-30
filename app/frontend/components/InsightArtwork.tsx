import PropertyIllustration from './PropertyIllustration';
export default function InsightArtwork({ topic }: { topic: string }) {
  if (topic === 'Property' || topic === 'Urban Planning') return <PropertyIllustration type={topic === 'Property' ? 'House' : 'Commercial'}/>;
  return <svg aria-hidden="true" viewBox="0 0 360 220" fill="none" className="h-full w-full">
    <path d="M0 0h360v220H0Z" fill="#eaf2ee"/><circle cx="282" cy="43" r="67" fill="#d7e8df"/>
    <g stroke="#1b7e75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {topic === 'Land Laws' ? <><path d="M111 33h98l31 31v123H111Z" fill="#fafbf5"/><path d="M209 33v31h31m-109 24h75m-75 14h56m-56 14h64"/><path d="m137 149 27-14 33 14-28 16-32-16Zm0 0v14l32 16 28-17v-13m-28 16v14" fill="#c1dfca"/><circle cx="226" cy="163" r="25" fill="#1b7e75"/><path d="m215 163 8 8 14-18" stroke="white" strokeWidth="3"/></> : <><path d="m64 143 103-57 127 49-104 63-126-55Z" fill="#bbd9ca"/><path d="m88 155 104-58m-68 73 104-59m-67 75 103-61m-150-10 127 51m-92-70 127 51" stroke="#f8fbf6" strokeWidth="3"/><path d="M84 73h103v-9H84Z" fill="#1b7e75"/><path d="M109 64V51h53v13M123 51V39h25v12"/><path d="m204 61 19-16 18 22-19 16Zm-22-27 19-16 18 22-19 16Zm19 6 22 27" fill="#d7e8df"/><circle cx="206" cy="52" r="12" fill="#1b7e75"/><path d="m205 64-8 29m-2-18c-10 6-14 16-11 26m23-21c7 8 8 16 4 24"/><circle cx="186" cy="141" r="13" fill="#fafbf5"/><path d="m180 141 5 5 8-10"/></>}
    </g>
  </svg>;
}

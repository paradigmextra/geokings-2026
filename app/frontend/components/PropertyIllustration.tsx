export default function PropertyIllustration({ type }: { type: string }) {
  return <svg aria-hidden="true" viewBox="0 0 360 192" className="h-full w-full" fill="none">
    <path fill="#eaf2ee" d="M0 0h360v192H0z"/>
    <circle cx="282" cy="44" r="47" fill="#d7e8df"/>
    <path d="M0 156c72-42 122 29 191-4s108-12 169-38v78H0Z" fill="#d9e9df"/>
    <path d="M0 173c90-22 126 21 215-11s104-5 145-13" stroke="#b4d2c4"/>
    <g stroke="#1b7e75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {type === 'Land' ? <>
        <path d="m85 128 94-55 99 45-96 57-97-47Z" fill="#c1dfca"/><path d="m85 128 97 47v8l-97-47Zm97 47 96-57v8l-96 57Z" fill="#9cc9ad"/>
        <path d="m118 112 96 44m-66-62 96 45m-119 8 94-55m-62 71 95-56" stroke="#f4f8ec" strokeWidth="2.5"/>
        <path d="M85 128v-17m193 7v-17m-96 74v-17m-3-85V56"/><circle cx="85" cy="109" r="3" fill="#d4a34c"/><circle cx="278" cy="99" r="3" fill="#d4a34c"/><circle cx="182" cy="156" r="3" fill="#d4a34c"/>
        <path d="M199 48c0 14-20 31-20 31s-20-17-20-31a20 20 0 0 1 40 0Z" fill="#1b7e75"/><circle cx="179" cy="48" r="7" fill="#eaf2ee" stroke="none"/>
      </> : type === 'Commercial' ? <>
        <path d="M106 63h142v100H106Z" fill="#fafbf5"/><path d="M119 42h116v21H119Z" fill="#c0ddd1"/><path d="M119 76h116v28H119Z" fill="#d5e9e0"/>
        <path d="M145 76v28m27-28v28m27-28v28m24-28v28M106 112h142"/>
        <path d="M120 125h32v38h-32Zm45 0h25v38h-25Zm38 0h31v38h-31Z" fill="#c0ddd1"/><path d="M136 125v38m83-38v38M98 163h158"/>
        <path d="M97 112h160l-9 9H106Z" fill="#1b7e75"/><path d="M137 52h80" stroke="#d4a34c" strokeWidth="3"/>
      </> : <>
        <path d="M109 95 174 44l74 48v70H109Z" fill="#fafbf5"/><path d="m95 96 79-61 86 57-12 10-74-48-65 51Z" fill="#1b7e75"/>
        <path d="M128 108h29v29h-29Zm64 0h34v29h-34Z" fill="#c1dfd2"/><path d="M142 108v29m-14-15h29m52-14v29m-17-15h34"/>
        <path d="M166 117h17v45h-17Z" fill="#e7d3a9"/><path d="M178 139h1M102 162h154m-79 0 20 30"/>
        <path d="M216 63V43h17v32" fill="#fafbf5"/>
      </>}
      {type !== 'Land' && <><path d="M77 162v-35m-10 11 10 9 10-9"/><path d="M77 107c-19 7-22 29-11 35-5 10 27 12 23-1 12-7 7-25-12-34Z" fill="#93c4a8"/><path d="M77 162v-28"/></>}
    </g>
  </svg>;
}

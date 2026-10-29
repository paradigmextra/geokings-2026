import { useId } from 'react';
// Decorative illustrations, not portraits or likenesses of the named clients.
export default function ClientAvatar({ variant }: { variant: number }) {
  const clipId = useId();
  const feminine = variant % 2 === 1;
  const skin = ['#9b6140', '#b8754e', '#754932', '#965d3f'][variant % 4];
  return <svg aria-hidden="true" width="64" height="64" viewBox="0 0 80 80" className="h-16 w-16 shrink-0 rounded-full">
    <defs><clipPath id={clipId}><circle cx="40" cy="40" r="40"/></clipPath></defs>
    <g clipPath={`url(#${clipId})`}>
      <path fill={variant % 2 ? '#dceee7' : '#103e47'} d="M0 0h80v80H0z"/>
      <circle cx="66" cy="16" r="23" fill={variant % 2 ? '#c6e4d7' : '#1b5961'}/>
      {feminine && <path d="M23 41V25c0-20 34-23 35 1l4 37H17Z" fill="#222d2e"/>}
      <path d="M9 86V70c0-14 15-20 31-20s31 6 31 20v16" fill={variant % 2 ? '#1b7e75' : '#edf3ee'}/>
      <path d="M32 43v14l8 8 8-8V43" fill={skin}/>
      <path d="m29 53 11 12-9 9-7-19m27-2L40 65l9 9 7-19" fill={variant % 2 ? '#b2ddd0' : '#cfddd6'}/>
      <path d="M26 25c0-18 29-18 29 0v12c0 11-8 18-15 18s-14-7-14-18Z" fill={skin}/>
      <path d={feminine ? 'M24 30V22c2-16 31-16 33 6-10-2-17-7-20-13-2 8-6 13-13 15Z' : 'M25 29V18c4-11 27-14 31 3v8l-6-10-21 3Z'} fill="#222d2e"/>
      <path d="M32 34h2m12 0h2" stroke="#172b2c" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M37 44q4 3 8-1" fill="none" stroke="#f6c7a4" strokeWidth="1.6" strokeLinecap="round"/>
      {variant === 2 && <path d="M28 31h10v7H28Zm15 0h10v7H43Zm-5 2h5" fill="none" stroke="#0f3039" strokeWidth="1.8"/>}
      <path d="M40 67v15" stroke={variant % 2 ? '#b2ddd0' : '#1b7e75'} strokeWidth="2"/>
      <path d="m57 66 4 3-4 3-4-3Z" fill="#d4a34c"/>
    </g>
  </svg>;
}

import { ImageResponse } from 'next/og';
export const alt = 'Geoking Consultancy — GIS, Land & Property Services in Malawi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', padding: '80px', color: 'white', background: 'linear-gradient(135deg, #0e3946, #1b7e75)', fontFamily: 'sans-serif' }}>
    <div style={{ display: 'flex', fontSize: 27, letterSpacing: 7, color: '#9de5d6', marginBottom: 36 }}>GEOKING CONSULTANCY</div>
    <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, lineHeight: 1.1 }}>A clearer view of your land & property.</div>
    <div style={{ display: 'flex', fontSize: 28, marginTop: 36 }}>GIS · Land surveying · Property services · Malawi</div>
  </div>, size);
}

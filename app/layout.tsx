import './frontend/index.css';
export const metadata = { title: 'Geoking Consultancy', description: 'Property and geospatial services in Malawi' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

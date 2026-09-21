'use client';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';
const App = dynamic(() => import('./frontend/App'), { ssr: false, loading: () => <p className="p-10">Loading Geoking…</p> });
export default function PublicApp() { return <HelmetProvider><App /></HelmetProvider>; }

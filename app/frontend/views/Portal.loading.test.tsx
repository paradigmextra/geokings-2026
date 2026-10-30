import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Portal from './Portal';
import type { Dashboard } from '../lib/portal-types';

vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt}/> }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));
const transport = vi.fn();
beforeEach(() => { transport.mockReset(); vi.stubGlobal('fetch', transport); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const show = (admin = false) => render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}} initialEntries={[admin ? '/admin' : '/client']}><Portal admin={admin}/></MemoryRouter>);

describe('portal startup', () => {
  it('uses a quiet branded indicator and opens guest sign-in after one request', async () => {
    let respond!: (response: Response) => void;
    transport.mockReturnValue(new Promise(resolve => { respond = resolve; }));
    show();
    expect(screen.getByRole('status', { name: 'Loading page' })).toBeInTheDocument();
    expect(screen.queryByText(/loading your workspace|loading your portal/i)).not.toBeInTheDocument();
    await act(async () => respond(Response.json({error:'Please sign in to continue.'},{status:401})));
    expect(await screen.findByRole('heading', { name: 'Good to see you again.' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('/api/dashboard', expect.objectContaining({method:'GET',headers:expect.objectContaining({'X-Geoking-Portal':'client'})}));
  });

  it('opens an authenticated admin dashboard without a second session lookup', async () => {
    const data: Dashboard = { user: { id:'admin-test',name:'Test Admin',email:'admin@example.test',role:'admin',account_type:'buyer',kyc_status:'not_submitted',created_at:'2026-10-30T00:00:00Z' }, users:[],properties:[],myListings:[],payments:[],saved:[],messages:[],paymentsConfigured:false };
    transport.mockResolvedValue(Response.json(data));
    show(true);
    expect(await screen.findByRole('heading', { name:'Business overview' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name:'Loading page' })).not.toBeInTheDocument();
    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('/api/dashboard',expect.objectContaining({headers:expect.objectContaining({'X-Geoking-Portal':'admin'})}));
  });

  it('shows a genuine connection failure instead of silently treating it as a guest', async () => {
    transport.mockResolvedValue(Response.json({error:'The service is temporarily unavailable.'},{status:503}));
    show();
    expect(await screen.findByRole('alert')).toHaveTextContent('The service is temporarily unavailable.');
    expect(screen.queryByRole('status', { name:'Loading page' })).not.toBeInTheDocument();
  });
});

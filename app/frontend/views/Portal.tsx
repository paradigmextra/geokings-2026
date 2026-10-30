import dynamic from 'next/dynamic';
import PropertyEditor, { type ListingInput } from '@/components/PropertyEditor';
import PropertyGallery from '@/components/PropertyGallery';
import PortalContact from '@/components/PortalContact';
const AdminAnalytics = dynamic(() => import('@/components/AdminAnalytics'), { ssr: false });
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import PortalAuth from "@/components/PortalAuth";
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, Users, CreditCard, Heart, LogOut, ArrowUpRight, Search, MapPin, Plus, ShieldCheck, Home, Store, BadgeCheck, PanelLeftClose, PanelLeftOpen, Menu, X, Mail, RefreshCw } from 'lucide-react';
import { portalApi, portalUpload } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { User, Property, Payment, Dashboard } from '@/lib/portal-types';
const money = (amount: number) => new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', maximumFractionDigits: 0 }).format(amount);
const blankProperty = { title: '', location: '', type: 'House', description: '', price: 0, image: '/assets/property-house.jpg', status: 'draft' };
const selectClass = 'h-10 rounded-md border bg-background px-3 text-sm w-full';
export default function Portal({ admin = false }: {
    admin?: boolean;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [register, setRegister] = useState(false);
    const [busy, setBusy] = useState(false);
    const [tab, setTab] = useState('Overview');
    const [moreOpen, setMoreOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('All');
    const [userType, setUserType] = useState('all');
    const [reviewStatus, setReviewStatus] = useState('pending');
    const [selected, setSelected] = useState<Property | null>(null);
    const [editor, setEditor] = useState<(typeof blankProperty & {
        id?: string;
    }) | null>(null);
    const [deletion, setDeletion] = useState<{
        path: string;
        name: string;
    } | null>(null);
    const portal = admin ? 'admin' : 'client';
    const request = useCallback(<T,>(path: string, method = 'GET', payload?: unknown) => portalApi<T>(portal, path, method, payload), [portal]);
    const refresh = useCallback(async () => { const result = await request<Dashboard>('dashboard'); setData(result); }, [request]);
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const { user } = await request<{
                    user: User | null;
                }>('auth/me');
                if (!active)
                    return;
                if (!user) {
                    setData(null);
                    return;
                }
                const result = await request<Dashboard>('dashboard');
                if (active)
                    setData(result);
            }
            catch (e) {
                if (active)
                    setError((e as Error).message);
            }
            finally {
                if (active)
                    setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [request]);
    const isAuthenticated = !!data;
    useEffect(() => {
        if (!isAuthenticated) return;
        const update = () => { if (document.visibilityState === 'visible') void refresh().catch(() => undefined); };
        window.addEventListener('focus', update);
        const timer = window.setInterval(update, 30000);
        return () => { window.removeEventListener('focus', update); window.clearInterval(timer); };
    }, [isAuthenticated, refresh]);
    useEffect(() => {
        const payment = new URLSearchParams(location.search).get('payment');
        if (!payment || !isAuthenticated)
            return;
        setTab('Payments');
        request<{ status: string }>(`payments/${encodeURIComponent(payment)}/verify`, 'POST').then(result => { toast.info(result.status === 'paid' ? 'Payment verified successfully.' : 'Payment is still pending. You can check again in Payments.'); return refresh(); }).catch(e => toast.error(e.message));
        navigate(admin ? '/admin' : '/client', { replace: true });
    }, [location.search, isAuthenticated, admin, navigate, refresh, request]);
    async function authenticate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setBusy(true);
        setError('');
        const values = Object.fromEntries(new FormData(event.currentTarget));
        if (register && values.password !== values.confirmPassword) { setError('Your passwords do not match.'); setBusy(false); return; }
        try {
            await request('auth/' + (register ? 'register' : 'login'), 'POST', values);
            await refresh();
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    async function action(fn: () => Promise<unknown>, message?: string) {
        setBusy(true);
        try {
            await fn();
            await refresh();
            if (message)
                toast.success(message);
        }
        catch (e) {
            toast.error((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    if (loading)
        return <main className="min-h-screen grid place-items-center bg-muted"><p role="status">Loading your workspace…</p></main>;
    if (!data)
        return <PortalAuth admin={admin} register={register} busy={busy} error={error} onModeChange={value => { setRegister(value); setError(''); }} onSubmit={authenticate}/>;
    const seller = !admin && data.user.account_type === 'seller';
    const tabs = admin ? [['Overview', LayoutDashboard], ['Properties', Building2], ['Users', Users], ['Listing approvals', BadgeCheck], ['Seller KYC', BadgeCheck], ['Payments', CreditCard], ['Contact', Mail], ['Settings', ShieldCheck]] as const : seller ? [['Overview', LayoutDashboard], ['Properties', Building2], ['My listings', Store], ['KYC', BadgeCheck], ['Payments', CreditCard], ['Contact', Mail], ['Account', Users]] as const : [['Overview', LayoutDashboard], ['Properties', Building2], ['Saved properties', Heart], ['Payments', CreditCard], ['Contact', Mail], ['Account', Users]] as const;
    const clients = data.users.filter(u => u.role === 'client');
    const visibleUsers = data.users.filter(u => (userType === 'all' || (u.role === 'admin' ? 'admin' : u.account_type) === userType) && `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase()));
    const paid = data.payments.filter(p => p.status === 'paid');
    const sourceProperties = tab === 'My listings' ? data.myListings : data.properties;
    const filtered = sourceProperties.filter(p => (tab !== 'Saved properties' || data.saved.includes(p.id)) && (type === 'All' || p.type === type) && `${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase()));
    const stats = admin ? [['Registered clients', clients.length], ['Buyers', clients.filter(u => u.account_type === 'buyer').length], ['Sellers', clients.filter(u => u.account_type === 'seller').length], ['Properties listed', data.properties.filter(p => p.approval_status === 'approved' && p.status !== 'draft').length], ['Properties sold', data.properties.filter(p => p.status === 'sold').length]] : [['Available properties', data.properties.filter(p => p.status === 'available').length], ['Saved properties', data.saved.length], ['Purchases', paid.length], ['Total paid', money(paid.reduce((sum, p) => sum + Number(p.amount), 0))]];
    const primaryLabels = admin ? ['Overview', 'Properties', 'Payments'] : seller ? ['Overview', 'Properties', 'My listings'] : ['Overview', 'Properties', 'Saved properties'];
    const primaryTabs = tabs.filter(([label]) => primaryLabels.includes(label));
    const shortLabel = (label: string) => ({ 'Overview':'Home', 'Saved properties':'Saved', 'My listings':'Listings', 'Seller KYC':'Seller KYC' } as Record<string,string>)[label] || label;
    async function signOut() {
        setBusy(true);
        try { await request('auth/logout', 'POST'); setMoreOpen(false); setData(null); setTab('Overview'); }
        catch (e) { toast.error((e as Error).message); }
        finally { setBusy(false); }
    }
    async function checkout(p: Property) { await action(async () => { const result = await request<{ url: string }>('payments/checkout', 'POST', { propertyId: p.id }); window.location.assign(result.url); }); }
    return <div className={`min-h-[100dvh] bg-[#f5f7f8] transition-[padding] duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
    <aside aria-label="Workspace sidebar" className={`fixed inset-y-0 left-0 z-40 hidden flex-col overflow-x-hidden bg-secondary text-white transition-[width] duration-300 lg:flex ${sidebarOpen ? 'w-64 p-6' : 'w-20 p-3'}`}>
      {sidebarOpen ? <Brand light/> : <Link to="/" aria-label="Geoking home" className="mx-auto"><img src="/assets/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-xl bg-white p-1"/></Link>}
      <p className={`mb-4 mt-10 whitespace-nowrap text-[10px] uppercase tracking-[.16em] text-white/45 ${sidebarOpen ? '' : 'sr-only'}`}>{admin ? 'Management workspace' : 'Your property workspace'}</p>
      <nav id="workspace-sidebar" aria-label="Dashboard" className={`flex min-h-0 flex-col gap-2 overflow-y-auto ${sidebarOpen ? '' : 'mt-10'}`}>{tabs.map(([label, Icon]) => <button key={label} title={label} aria-label={label} aria-current={tab === label ? 'page' : undefined} onClick={() => { setTab(label); setSearch(''); }} className={`flex min-h-12 items-center rounded-xl text-left text-sm transition-colors ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} ${tab === label ? 'bg-[#218d84] text-white shadow-sm' : 'text-white/65 hover:bg-white/10'}`}><Icon size={20} className="shrink-0"/>{sidebarOpen && <span className="whitespace-nowrap">{label}</span>}</button>)}</nav>
      <Link to="/" title="Back to website" className={`mt-auto flex min-h-12 items-center gap-3 rounded-xl text-sm text-white/60 hover:text-white ${sidebarOpen ? 'px-4' : 'justify-center'}`}><Home size={20} className="shrink-0"/>{sidebarOpen && 'Back to website'}</Link>
    </aside>
    <Drawer open={moreOpen} onOpenChange={setMoreOpen} shouldScaleBackground={false}>
      <nav aria-label="Mobile dashboard" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-primary/10 bg-white px-2 pt-2 pb-[max(.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(16,46,52,.06)] lg:hidden">
        {primaryTabs.map(([label, Icon]) => <button key={label} aria-label={label} aria-current={tab === label ? 'page' : undefined} onClick={() => { setTab(label); setSearch(''); setMoreOpen(false); }} className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold ${tab === label ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}><Icon size={22} strokeWidth={tab === label ? 2.2 : 1.7}/><span>{shortLabel(label)}</span></button>)}
        <DrawerTrigger asChild><button type="button" aria-label="More workspace options" className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold ${moreOpen || !primaryLabels.includes(tab) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}><Menu size={22}/><span>More</span></button></DrawerTrigger>
      </nav>
      <DrawerContent className="max-h-[70dvh] rounded-t-3xl px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <DrawerHeader className="relative px-0 pb-4 pt-4 text-left"><DrawerTitle className="font-heading text-xl">Your workspace</DrawerTitle><DrawerDescription>{data.user.name} · {admin ? 'Administrator' : seller ? 'Seller account' : 'Buyer account'}</DrawerDescription><DrawerClose asChild><button type="button" aria-label="Close workspace menu" className="absolute right-0 top-3 grid h-11 w-11 place-items-center rounded-full bg-muted text-secondary"><X size={20}/></button></DrawerClose></DrawerHeader>
        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <nav aria-label="All workspace options" className="grid grid-cols-3 gap-2">{tabs.map(([label, Icon]) => <button key={label} aria-label={label} aria-current={tab === label ? 'page' : undefined} onClick={() => { setTab(label); setSearch(''); setMoreOpen(false); }} className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl p-2 text-xs font-semibold ${tab === label ? 'bg-primary/10 text-primary' : 'bg-muted/60 text-secondary hover:bg-muted'}`}><Icon size={23} strokeWidth={1.7}/><span>{shortLabel(label)}</span></button>)}</nav>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4"><Link to="/" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium text-secondary"><Home size={18}/> Website</Link><button type="button" disabled={busy} onClick={signOut} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium text-secondary"><LogOut size={18}/> Sign out</button></div>
        </div>
      </DrawerContent>
    </Drawer>
    <header className="sticky top-0 z-40 bg-white/95 border-b px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex justify-between items-center backdrop-blur"><div className="flex min-w-0 items-center gap-3"><button type="button" aria-label={sidebarOpen ? "Collapse navigation" : "Expand navigation"} aria-expanded={sidebarOpen} aria-controls="workspace-sidebar" onClick={() => setSidebarOpen(value => !value)} className="hidden h-11 w-11 place-items-center rounded-xl border border-border text-secondary hover:bg-muted lg:grid">{sidebarOpen ? <PanelLeftClose size={20}/> : <PanelLeftOpen size={20}/>}</button><div className="lg:hidden"><Brand/></div><div className="hidden lg:block"><p className="text-xs text-muted-foreground">Geoking Consultancy</p><p className="font-medium text-sm mt-1">{admin ? 'Admin' : 'Client'} dashboard</p></div></div><div className="flex gap-3 items-center">{admin && <button type="button" aria-label="Refresh dashboard data" disabled={busy} onClick={() => action(refresh)} className="hidden h-10 w-10 place-items-center rounded-xl border border-border text-primary hover:bg-primary/5 lg:grid"><RefreshCw size={17} className={busy ? 'animate-spin' : ''}/></button>}<div className="hidden sm:block text-right"><p className="text-sm font-semibold">{data.user.name}</p><p className="text-xs text-muted-foreground capitalize">{data.user.role}</p></div><Button variant="ghost" size="icon" aria-label={`Sign out of ${admin ? 'admin' : 'client'} portal`} disabled={busy} onClick={signOut}><LogOut size={18}/></Button></div></header>
    <main className="p-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:p-6 sm:pb-[calc(6rem+env(safe-area-inset-bottom))] lg:p-10 lg:pb-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-8"><div><p className="section-label mb-2">{tab === 'Overview' ? (admin ? 'Your business, in focus' : 'A little closer to your goals') : 'Your workspace'}</p><h1 className="text-2xl lg:text-3xl font-semibold">{tab === 'Overview' ? (admin ? 'Business overview' : `Welcome, ${data.user.name.split(' ')[0]}`) : tab}</h1><p className="text-muted-foreground text-sm mt-2 max-w-2xl">{admin ? 'Manage properties, clients, seller verification and payments.' : seller ? 'List properties and track their approval from your seller workspace.' : 'Explore opportunities and keep track of your property journey.'}</p></div>{((admin && (tab === 'Properties' || tab === 'Overview')) || (seller && tab === 'My listings')) && <Button className="w-full sm:w-auto" disabled={!admin && data.user.kyc_status !== 'approved'} onClick={() => setEditor({ ...blankProperty })}><Plus size={16}/> Add property</Button>}</div>
      {tab === 'Overview' && <>
        {!admin && <div className={`grid grid-cols-2 ${admin ? 'xl:grid-cols-5' : 'xl:grid-cols-4'} gap-3 sm:gap-4 mb-6 sm:mb-8`}>{stats.map(([label, value]) => <div key={label} className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm"><p className="text-xs sm:text-sm text-muted-foreground">{label}</p><p className="text-xl sm:text-2xl font-semibold mt-3 text-secondary break-words">{value}</p></div>)}</div>}
        {admin && <AdminAnalytics users={data.users} properties={data.properties} onNavigate={setTab}/>}
        {!admin && <div className="hero-gradient rounded-2xl p-5 sm:p-8 text-white mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6"><div><p className="text-xs tracking-widest uppercase text-white/60 mb-3">Make your next move</p><h2 className="text-xl sm:text-2xl font-semibold">Your next property is waiting.</h2><p className="text-white/70 text-sm mt-3">Browse land, homes and commercial spaces across Malawi.</p></div><Button variant="secondary" className="w-full sm:w-auto bg-white text-secondary hover:bg-white/90" onClick={() => setTab('Properties')}>Explore properties <ArrowUpRight size={16}/></Button></div>}
        <div className="flex justify-between mb-4"><h2 className="font-semibold">{admin ? 'Recent transactions' : 'Featured properties'}</h2><button className="text-sm text-primary" onClick={() => setTab(admin ? 'Payments' : 'Properties')}>View all →</button></div>
        {admin ? <PaymentTable payments={data.payments.slice(0, 5)} admin busy={busy} verify={id => action(() => request(`payments/${id}/verify`, 'POST'), 'Payment status refreshed.')}/> : <PropertyGrid properties={data.properties.filter(p => p.status === 'available').slice(0, 3)} onView={setSelected} saved={data.saved} onSave={p => action(() => request(`saved/${p.id}`, data.saved.includes(p.id) ? 'DELETE' : 'POST'))} busy={busy}/>}
      </>}
      {(tab === 'Properties' || tab === 'Saved properties' || tab === 'My listings') && <><div className="flex flex-col sm:flex-row gap-3 mb-6"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-muted-foreground"/><Input aria-label="Search properties" placeholder="Search by property or location" className="pl-10 bg-white" value={search} onChange={e => setSearch(e.target.value)}/></div><select aria-label="Property type" className={`${selectClass} sm:w-48`} value={type} onChange={e => setType(e.target.value)}>{['All', 'House', 'Land', 'Commercial'].map(t => <option key={t}>{t}</option>)}</select></div><PropertyGrid properties={filtered} onView={setSelected} admin={admin} saved={data.saved} busy={busy} onSave={p => action(() => request(`saved/${p.id}`, data.saved.includes(p.id) ? 'DELETE' : 'POST'))}/></>}
      {tab === 'Users' && <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">{[['All accounts', data.users.length], ['Buyers', clients.filter(u => u.account_type === 'buyer').length], ['Sellers', clients.filter(u => u.account_type === 'seller').length]].map(([label, count]) => <div key={label} className="rounded-2xl border bg-white p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold text-secondary">{count}</p></div>)}</div>
        <div className="flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-muted-foreground"/><Input aria-label="Search users" placeholder="Search name or email" className="bg-white pl-10" value={search} onChange={e => setSearch(e.target.value)}/></div><select aria-label="Filter account type" className={`${selectClass} sm:w-48`} value={userType} onChange={e => setUserType(e.target.value)}><option value="all">All accounts</option><option value="buyer">Buyers</option><option value="seller">Sellers</option><option value="admin">Administrators</option></select></div>
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-muted"><tr>{['Name', 'Email', 'Account type', 'Joined', 'Action'].map(v => <th key={v} className="p-4">{v}</th>)}</tr></thead><tbody>{visibleUsers.map(u => <tr key={u.id} className="border-t"><td className="p-4 font-medium">{u.name}</td><td className="p-4">{u.email}</td><td className="p-4"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">{u.role === 'admin' ? 'Administrator' : u.account_type}</span></td><td className="whitespace-nowrap p-4">{u.created_at.slice(0, 10)}</td><td className="p-4">{u.role === 'admin' ? <span className="text-xs text-muted-foreground">Protected account</span> : <Button variant="outline" className="text-destructive" onClick={() => setDeletion({ path: `admin/users/${u.id}`, name: u.name })}>Delete user</Button>}</td></tr>)}</tbody></table>{!visibleUsers.length && <Empty text="No accounts match. New buyer and seller registrations appear here."/>}</div>
      </div>}
      {admin && tab === 'Listing approvals' && <div className="space-y-5"><div className="flex flex-wrap items-center justify-between gap-4"><p className="max-w-xl text-sm text-muted-foreground">Review seller photos, descriptions and pricing before making a property available to buyers.</p><select aria-label="Listing review status" className={`${selectClass} sm:w-48`} value={reviewStatus} onChange={e => setReviewStatus(e.target.value)}><option value="pending">Awaiting review</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>{data.properties.filter(p => p.owner_user_id && p.approval_status === reviewStatus).map(p => <article key={p.id} className="grid gap-5 rounded-2xl border bg-white p-4 sm:grid-cols-[180px_1fr] sm:p-5"><img src={p.image} alt={p.title} className="aspect-[4/3] w-full rounded-xl object-cover"/><div><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold">{p.title}</h2><Status value={p.approval_status}/></div><p className="mt-2 text-sm text-muted-foreground">{p.owner_name || 'Seller'} · {p.location}</p><p className="mt-2 font-semibold text-primary">{money(Number(p.price))}</p><p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={() => setSelected(p)}>Review details & photos</Button>{p.approval_status === 'pending' && <><Button size="sm" disabled={busy} onClick={() => action(() => request(`admin/properties/${p.id}/approval`, 'PUT', { approvalStatus: 'approved' }), 'Listing approved.')}>Approve</Button><Button size="sm" variant="outline" disabled={busy} onClick={() => action(() => request(`admin/properties/${p.id}/approval`, 'PUT', { approvalStatus: 'rejected' }), 'Listing rejected.')}>Reject</Button></>}</div></div></article>)}{!data.properties.some(p => p.owner_user_id && p.approval_status === reviewStatus) && <Empty text={`No ${reviewStatus === 'pending' ? 'listings awaiting review' : reviewStatus + ' seller listings'} yet.`}/>}</div>}
      {tab === 'Contact' && <PortalContact admin={admin} messages={data.messages || []} send={async (subject,message) => { await request('contact','POST',{subject,message}); await refresh(); toast.success('Enquiry sent.'); }} reply={async (id,reply) => { await request(`admin/contact/${id}`,'PUT',{reply}); await refresh(); toast.success('Reply saved for the client.'); }}/>}
      {tab === 'Seller KYC' && <div className="space-y-4">{clients.filter(u => u.account_type === 'seller').map(u => <div key={u.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex items-center gap-2"><h2 className="font-semibold">{u.name}</h2><Status value={u.kyc_status}/></div><p className="text-sm text-muted-foreground">{u.email}</p><dl className="mt-4 grid gap-2 text-sm"><div><dt className="text-muted-foreground">ID number</dt><dd>{u.kyc_id_number || 'Not provided'}</dd></div><div><dt className="text-muted-foreground">Phone</dt><dd>{u.kyc_phone || 'Not provided'}</dd></div><div><dt className="text-muted-foreground">Address</dt><dd>{u.kyc_address || 'Not provided'}</dd></div></dl>{u.kyc_document_uploaded ? <Button className="mt-4" size="sm" variant="outline" asChild><a href={`/api/admin/kyc/${u.id}/document`} target="_blank" rel="noreferrer">View KYC document</a></Button> : <p className="mt-4 text-sm text-destructive">No document uploaded</p>}</div>{u.kyc_status === 'pending' && <div className="flex gap-2"><Button size="sm" disabled={!u.kyc_document_uploaded} onClick={() => action(() => request(`admin/kyc/${u.id}`, 'PUT', { status: 'approved' }), 'Seller KYC approved.')}>Approve</Button><Button size="sm" variant="outline" onClick={() => action(() => request(`admin/kyc/${u.id}`, 'PUT', { status: 'rejected' }), 'Seller KYC rejected.')}>Reject</Button></div>}</div></div>)}{!clients.some(u => u.account_type === 'seller') && <Empty text="No seller accounts yet."/>}</div>}
      {seller && tab === 'KYC' && <form className="max-w-2xl space-y-5 rounded-2xl border bg-white p-5 sm:p-7" encType="multipart/form-data" onSubmit={e => { e.preventDefault(); const values = new FormData(e.currentTarget); action(() => portalUpload('client', 'seller/kyc', values), 'KYC submitted for administrator review.'); }}><div><h2 className="text-xl font-semibold">Seller verification</h2><p className="mt-2 text-sm text-muted-foreground">Submit your details and a clear ID image or PDF. You can list properties after an administrator approves your KYC.</p><div className="mt-3"><Status value={data.user.kyc_status}/></div>{data.user.kyc_status === 'rejected' && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">Your KYC was rejected. Correct your details, upload a new document, and submit again.</p>}</div><Field label="National ID or passport number"><Input name="idNumber" defaultValue={data.user.kyc_id_number} minLength={5} maxLength={80} required/></Field><Field label="Phone number"><Input name="phone" type="tel" defaultValue={data.user.kyc_phone} minLength={7} maxLength={30} required/></Field><Field label="Residential or business address"><textarea name="address" defaultValue={data.user.kyc_address} minLength={5} maxLength={250} required className="min-h-24 w-full rounded-md border p-3 text-sm"/></Field><Field label={data.user.kyc_document_uploaded ? 'Replace ID document' : 'Upload ID document'}><Input name="document" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required/><p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WebP or PDF. Maximum 5 MB.</p></Field><Button disabled={busy}>{busy ? 'Uploading…' : data.user.kyc_status === 'rejected' ? 'Re-upload KYC' : 'Submit KYC'}</Button></form>}
      {tab === 'Payments' && <><div className="bg-white border rounded-xl p-5 mb-5 text-sm text-muted-foreground">Payments are confirmed with PayChangu before a property is marked sold. A pending payment reserves the property. {admin && 'Use Check status to reconcile payments with the provider.'}</div><PaymentTable payments={data.payments} admin={admin} busy={busy} verify={id => action(() => request(`payments/${id}/verify`, 'POST'), 'Payment status refreshed.')}/></>}
      {(tab === 'Account' || tab === 'Settings') && <div className="bg-white border rounded-xl p-5 sm:p-7 max-w-2xl space-y-5"><h2 className="text-xl font-semibold">{admin ? 'Workspace settings' : 'Your account'}</h2><div><p className="text-sm text-muted-foreground">Name</p><p>{data.user.name}</p></div><div><p className="text-sm text-muted-foreground">Email</p><p>{data.user.email}</p></div><div><p className="text-sm text-muted-foreground">Account type</p><p className="capitalize">{admin ? data.user.role : data.user.account_type}</p></div><PasswordForm busy={busy} submit={values => action(() => request('account/password', 'PUT', values), 'Password changed successfully.')}/>{admin && <div className="rounded-lg bg-muted p-5"><h3 className="font-semibold">PayChangu mobile money</h3><p className="text-sm mt-2">{data.paymentsConfigured ? 'API key configured. Complete a sandbox payment before going live.' : 'Not configured. Add the PayChangu secret key and webhook secret to the server environment.'}</p><p className="text-xs mt-3 text-muted-foreground">Webhook endpoint: /api/payments/webhook</p></div>}</div>}
    </main>
    <Dialog open={!!selected} onOpenChange={open => { if (!open)
        setSelected(null); }}><DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">{selected && <><DialogHeader><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.location} · {selected.type}</DialogDescription></DialogHeader><PropertyGallery key={selected.id} property={selected}/><div className="flex justify-between items-center"><p className="text-2xl text-primary font-semibold">{money(Number(selected.price))}</p><Status value={selected.status}/></div><p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{selected.description}</p>{admin ? <div className="flex flex-wrap gap-3">{selected.approval_status === 'pending' && <><Button disabled={busy} onClick={() => action(async () => { await request(`admin/properties/${selected.id}/approval`,'PUT',{approvalStatus:'approved'}); setSelected(null); },'Listing approved.')}>Approve listing</Button><Button variant="outline" disabled={busy} onClick={() => action(async () => { await request(`admin/properties/${selected.id}/approval`,'PUT',{approvalStatus:'rejected'}); setSelected(null); },'Listing rejected.')}>Reject listing</Button></>}<Button onClick={() => { setEditor({ ...selected, price: Number(selected.price) }); setSelected(null); }}>Edit property</Button><Button variant="destructive" onClick={() => { setDeletion({ path: `admin/properties/${selected.id}`, name: selected.title }); setSelected(null); }}>Delete property</Button></div> : seller ? <p className="rounded-xl bg-primary/5 p-4 text-sm">Listing review: <span className="font-semibold capitalize">{selected.approval_status}</span>. Approved properties are visible to buyers.</p> : <><p className="text-xs text-muted-foreground">Full property payment through PayChangu. Legal transfer and supporting documents are arranged with Geoking after payment.</p><Button disabled={busy || selected.status !== 'available' || !data.paymentsConfigured} onClick={() => checkout(selected)}>{busy ? 'Preparing checkout…' : selected.status === 'sold' ? 'Property sold' : 'Pay with mobile money'} <ArrowUpRight size={16}/></Button>{!data.paymentsConfigured && <p className="text-sm text-muted-foreground">Online payments are being set up. Contact Geoking to discuss this property.</p>}</>}</>}</DialogContent></Dialog>
    <Dialog open={!!editor} onOpenChange={open => { if (!open && !busy) setEditor(null); }}><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editor?.id ? 'Edit property' : 'Add property'}</DialogTitle><DialogDescription>{admin ? 'Manage property details and the full purchase price in Malawi kwacha.' : 'Add clear photos and accurate details. Geoking will review your listing.'}</DialogDescription></DialogHeader>{editor && <PropertyEditor key={editor.id || 'new'} initial={editor} admin={admin} busy={busy} save={async (value: ListingInput,files) => {
        setBusy(true);
        try {
            if (!value.id && (files.length || !admin)) {
                const form = new FormData();
                Object.entries(value).forEach(([key,item]) => form.set(key,String(item)));
                files.forEach(file => form.append('photos',file));
                await portalUpload(portal,admin ? 'admin/properties' : 'seller/properties',form);
            } else await request(`admin/properties${value.id ? '/' + value.id : ''}`,value.id ? 'PUT' : 'POST',value);
            setEditor(null); await refresh(); toast.success(admin ? 'Property saved.' : 'Property submitted for review.');
        } catch(error) { toast.error((error as Error).message); } finally { setBusy(false); }
    }}/>}</DialogContent></Dialog>
    <AlertDialog open={!!deletion} onOpenChange={open => { if (!open)
        setDeletion(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {deletion?.name}?</AlertDialogTitle><AlertDialogDescription>This cannot be undone. Deleting a client revokes their sessions. Completed payment records are retained without the account.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction disabled={busy} className="bg-destructive" onClick={() => { if (deletion)
        action(() => request(deletion.path, 'DELETE'), 'Deleted successfully.'); setDeletion(null); }}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}
function Brand({ light = false }: {
    light?: boolean;
}) { return <Link to="/" className="flex items-center gap-3"><img src="/assets/logo.png" alt="Geoking" className="w-10 h-10 bg-white rounded-full p-1"/><div><p className={`font-bold text-lg tracking-wide ${light ? 'text-white' : 'text-secondary'}`}>GEOKING</p><p className={`text-[9px] uppercase tracking-[.25em] ${light ? 'text-white/60' : 'text-muted-foreground'}`}>Consultancy</p></div></Link>; }
function Field({ label, children }: {
    label: string;
    children: React.ReactNode;
}) { return <label className="block"><span className="block text-sm font-medium mb-2">{label}</span>{children}</label>; }
function PasswordForm({ busy, submit }: { busy: boolean; submit: (values: Record<string, FormDataEntryValue>) => void }) {
    return <form className="space-y-4 border-t pt-5" onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const values = Object.fromEntries(new FormData(form)); if (values.newPassword !== values.confirmPassword) { toast.error('New passwords do not match.'); return; } submit(values); form.reset(); }}><div><h3 className="font-semibold">Change password</h3><p className="mt-1 text-sm text-muted-foreground">Use at least 12 characters for your new password.</p></div><Field label="Current password"><Input name="currentPassword" type="password" autoComplete="current-password" required/></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="New password"><Input name="newPassword" type="password" autoComplete="new-password" minLength={12} maxLength={72} required/></Field><Field label="Confirm new password"><Input name="confirmPassword" type="password" autoComplete="new-password" minLength={12} maxLength={72} required/></Field></div><Button type="submit" variant="outline" disabled={busy}>{busy ? 'Updating…' : 'Change password'}</Button></form>;
}
function Empty({ text }: {
    text: string;
}) { return <div className="p-8 sm:p-12 text-center border border-dashed rounded-xl text-muted-foreground bg-white"><Building2 className="mx-auto mb-4 opacity-40" size={32}/><p className="text-sm">{text}</p></div>; }
function Status({ value }: {
    value: string;
}) { return <span className={`inline-flex text-xs rounded-full px-3 py-1 capitalize ${['paid', 'available'].includes(value) ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{value}</span>; }
function PropertyGrid({ properties, onView, onSave, saved = [], admin = false, busy = false }: {
    properties: Property[];
    onView: (p: Property) => void;
    onSave: (p: Property) => void;
    saved?: string[];
    admin?: boolean;
    busy?: boolean;
}) {
    if (!properties.length)
        return <Empty text={admin ? 'No listings yet. Add your first property to get started.' : 'No properties found. Check back soon or adjust your search.'}/>;
    return <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{properties.map(p => <article key={p.id} className="bg-white border rounded-xl overflow-hidden"><div className="relative"><img src={p.image} alt={p.title} className="w-full h-48 object-cover"/><span className="absolute left-4 top-4"><Status value={p.approval_status !== 'approved' ? p.approval_status : p.status}/></span>{!admin && p.approval_status === 'approved' && <button aria-label={saved.includes(p.id) ? 'Remove from saved properties' : 'Save property'} disabled={busy} onClick={() => onSave(p)} className="absolute right-4 top-4 bg-white rounded-full p-2 text-primary"><Heart size={17} fill={saved.includes(p.id) ? 'currentColor' : 'none'}/></button>}</div><div className="p-5"><p className="text-xs text-muted-foreground mb-2">{p.type}</p><h3 className="line-clamp-2 font-semibold">{p.title}</h3><p className="flex gap-1 text-sm text-muted-foreground mt-2"><MapPin size={15}/>{p.location}</p><div className="border-t mt-5 pt-4 flex justify-between items-center gap-2"><p className="font-semibold text-primary">{money(Number(p.price))}</p><Button variant="ghost" size="sm" onClick={() => onView(p)}>View <ArrowUpRight size={15}/></Button></div></div></article>)}</div>;
}
function PaymentTable({ payments, admin, busy, verify }: {
    payments: Payment[];
    admin: boolean;
    busy: boolean;
    verify: (id: string) => void;
}) {
    if (!payments.length) return <Empty text="No payments yet. Transactions will appear here when checkout starts."/>;
    return <div className="overflow-x-auto rounded-2xl border bg-white"><table className="min-w-[680px] w-full text-left text-sm"><thead className="bg-muted"><tr>{['Property', ...(admin ? ['Client'] : []), 'Amount', 'Status', 'Actions'].map(t => <th className="p-4" key={t}>{t}</th>)}</tr></thead><tbody>{payments.map(p => <tr key={p.id} className="border-t"><td className="p-4"><p className="font-medium">{p.title}</p><p className="text-xs text-muted-foreground mt-1">{p.created_at.slice(0, 10)}</p><p className="text-[10px] text-muted-foreground mt-1 break-all">{p.id}</p></td>{admin && <td className="p-4">{p.customer || 'Deleted account'}</td>}<td className="p-4 whitespace-nowrap">{money(Number(p.amount))}</td><td className="p-4"><Status value={p.status}/></td><td className="p-4">{p.status === 'pending' && <div className="flex gap-2"><Button size="sm" variant="outline" disabled={busy} onClick={() => verify(p.id)}>Check status</Button>{!admin && p.checkout_url && <Button size="sm" asChild><a href={p.checkout_url}>Continue payment</a></Button>}</div>}</td></tr>)}</tbody></table>{!payments.length && <Empty text="No payments yet. Transactions will appear here when checkout starts."/>}</div>; }



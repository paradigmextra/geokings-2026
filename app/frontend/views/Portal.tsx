import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, Users, CreditCard, Heart, LogOut, ArrowUpRight, Search, MapPin, Plus, ShieldCheck, Home, Store, BadgeCheck } from 'lucide-react';
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
    const [search, setSearch] = useState('');
    const [type, setType] = useState('All');
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
        return <main className="min-h-[100dvh] grid lg:grid-cols-2 bg-[#f4f7f7]">
    <section className="hero-gradient text-white p-8 lg:p-16 hidden lg:flex flex-col justify-between">
      <Brand light/><div className="py-12 max-w-lg"><p className="text-sm uppercase tracking-[.25em] text-white/70 mb-5">Your next chapter starts here</p><h1 className="text-4xl lg:text-5xl font-bold leading-tight">A place to call<br />your own.</h1><p className="mt-6 text-white/75 leading-relaxed">Discover property across Malawi. Keep your favourites together and manage your journey with Geoking.</p></div>
      <p className="text-sm text-white/60 flex gap-2 items-center"><ShieldCheck size={18}/> Secure access to your Geoking account</p>
    </section>
    <section className="min-h-[100dvh] p-4 sm:p-8 lg:p-16 flex items-center justify-center"><div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-[1.75rem] border shadow-xl shadow-secondary/5">
      <div className="lg:hidden mb-8"><Brand/></div>
      <p className="section-label mb-3">{admin ? 'Administration' : 'Client portal'}</p><h2 className="text-2xl font-semibold">{register ? 'Create your account' : 'Welcome back'}</h2><p className="text-muted-foreground mt-2 mb-7">{admin ? 'Sign in with your administrator account.' : register ? 'Find your next property with Geoking.' : 'Sign in to continue your property journey.'}</p>
      <form onSubmit={authenticate} className="space-y-5">{register && <Field label="Full name"><Input name="name" autoComplete="name" minLength={2} maxLength={100} required/></Field>}
        {register ? <Field label="Email address"><Input name="email" type="email" autoComplete="email" required/></Field> : <Field label={admin ? 'Username' : 'Email address'}><Input name="identifier" type={admin ? 'text' : 'email'} autoComplete="username" required/></Field>}
        {register && <Field label="I want to"><select name="accountType" className={selectClass} defaultValue="buyer"><option value="buyer">Buy properties</option><option value="seller">Sell properties</option></select></Field>}
        <Field label="Password"><Input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 12 : 1} maxLength={72} required/></Field>
        {register && <p className="text-xs text-muted-foreground">Use at least 12 characters for your password.</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button disabled={busy} className="w-full">{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'} <ArrowUpRight size={16}/></Button>
      </form>
      {!admin && <p className="text-sm text-center mt-6">{register ? 'Already have an account?' : 'New to Geoking?'} <button className="text-primary font-semibold" onClick={() => { setRegister(!register); setError(''); }}>{register ? 'Sign in' : 'Create account'}</button></p>}
      <Link to="/" className="block mt-8 text-center text-sm text-muted-foreground">← Back to website</Link>
    </div></section>
  </main>;
    const seller = !admin && data.user.account_type === 'seller';
    const tabs = admin ? [['Overview', LayoutDashboard], ['Properties', Building2], ['Users', Users], ['Seller KYC', BadgeCheck], ['Payments', CreditCard], ['Settings', ShieldCheck]] as const : seller ? [['Overview', LayoutDashboard], ['Properties', Building2], ['My listings', Store], ['KYC', BadgeCheck], ['Payments', CreditCard], ['Account', Users]] as const : [['Overview', LayoutDashboard], ['Properties', Building2], ['Saved properties', Heart], ['Payments', CreditCard], ['Account', Users]] as const;
    const clients = data.users.filter(u => u.role === 'client');
    const paid = data.payments.filter(p => p.status === 'paid');
    const sourceProperties = tab === 'My listings' ? data.myListings : data.properties;
    const filtered = sourceProperties.filter(p => (tab !== 'Saved properties' || data.saved.includes(p.id)) && (type === 'All' || p.type === type) && `${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase()));
    const stats = admin ? [['Registered clients', clients.length], ['Available properties', data.properties.filter(p => p.status === 'available').length], ['Pending payments', data.payments.filter(p => p.status === 'pending').length], ['Verified revenue', money(paid.reduce((sum, p) => sum + Number(p.amount), 0))]] : [['Available properties', data.properties.filter(p => p.status === 'available').length], ['Saved properties', data.saved.length], ['Purchases', paid.length], ['Total paid', money(paid.reduce((sum, p) => sum + Number(p.amount), 0))]];
    async function checkout(p: Property) { await action(async () => { const result = await request<{ url: string }>('payments/checkout', 'POST', { propertyId: p.id }); window.location.assign(result.url); }); }
    return <div className="min-h-[100dvh] bg-[#f5f7f8] lg:pl-64">
    <aside className="hidden bg-secondary text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex flex-col p-7">
      <Brand light/><p className="text-[10px] uppercase tracking-[.2em] text-white/45 mt-8 mb-3">{admin ? 'Management workspace' : 'Your property workspace'}</p>
      <nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible">{tabs.map(([label, Icon]) => <button key={label} onClick={() => { setTab(label); setSearch(''); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left whitespace-nowrap ${tab === label ? 'bg-white/15 text-white' : 'text-white/65 hover:bg-white/10'}`}><Icon size={18}/>{label}</button>)}</nav>
      <div className="mt-auto pt-8 hidden lg:block"><div className="rounded-xl bg-white/5 p-4 text-sm text-white/65">Property decisions,<br /><span className="text-white">made with confidence.</span></div><Link to="/" className="flex items-center gap-2 text-sm text-white/60 mt-6"><Home size={16}/> Back to website</Link></div>
    </aside>
    <nav aria-label="Mobile dashboard" className="fixed inset-x-3 bottom-3 z-50 flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-secondary/95 p-2 text-white shadow-2xl backdrop-blur-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">{tabs.map(([label, Icon]) => <button key={label} onClick={() => { setTab(label); setSearch(''); }} aria-label={label} className={`flex min-w-[4.5rem] flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] transition-colors ${tab === label ? 'bg-white/15 text-white' : 'text-white/60'}`}><Icon size={19}/><span className="max-w-full truncate">{label.replace(' properties', '')}</span></button>)}</nav>
    <header className="sticky top-0 z-40 bg-white/95 border-b px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex justify-between items-center backdrop-blur"><div className="flex items-center gap-3"><div className="lg:hidden"><Brand/></div><div className="hidden lg:block"><p className="text-xs text-muted-foreground">Geoking Consultancy</p><p className="font-medium text-sm mt-1">{admin ? 'Admin' : 'Client'} dashboard</p></div></div><div className="flex gap-3 items-center"><div className="hidden sm:block text-right"><p className="text-sm font-semibold">{data.user.name}</p><p className="text-xs text-muted-foreground capitalize">{data.user.role}</p></div><Button variant="ghost" size="icon" aria-label={`Sign out of ${admin ? 'admin' : 'client'} portal`} disabled={busy} onClick={async () => { setBusy(true); try {
        await request('auth/logout', 'POST');
        setData(null);
        setTab('Overview');
    }
    catch (e) {
        toast.error((e as Error).message);
    }
    finally {
        setBusy(false);
    } }}><LogOut size={18}/></Button></div></header>
    <main className="p-4 pb-28 sm:p-6 sm:pb-28 lg:p-10 lg:pb-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-8"><div><p className="section-label mb-2">{tab === 'Overview' ? 'A little closer to your goals' : 'Your workspace'}</p><h1 className="text-2xl lg:text-3xl font-semibold">{tab === 'Overview' ? `Welcome, ${data.user.name.split(' ')[0]}` : tab}</h1><p className="text-muted-foreground text-sm mt-2 max-w-2xl">{admin ? 'Manage properties, clients, seller verification and payments.' : seller ? 'List properties and track their approval from your seller workspace.' : 'Explore opportunities and keep track of your property journey.'}</p></div>{((admin && (tab === 'Properties' || tab === 'Overview')) || (seller && tab === 'My listings')) && <Button className="w-full sm:w-auto" disabled={!admin && data.user.kyc_status !== 'approved'} onClick={() => setEditor({ ...blankProperty })}><Plus size={16}/> Add property</Button>}</div>
      {tab === 'Overview' && <>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">{stats.map(([label, value]) => <div key={label} className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm"><p className="text-xs sm:text-sm text-muted-foreground">{label}</p><p className="text-xl sm:text-2xl font-semibold mt-3 text-secondary break-words">{value}</p></div>)}</div>
        {!admin && <div className="hero-gradient rounded-2xl p-5 sm:p-8 text-white mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6"><div><p className="text-xs tracking-widest uppercase text-white/60 mb-3">Make your next move</p><h2 className="text-xl sm:text-2xl font-semibold">Your next property is waiting.</h2><p className="text-white/70 text-sm mt-3">Browse land, homes and commercial spaces across Malawi.</p></div><Button variant="secondary" className="w-full sm:w-auto bg-white text-secondary hover:bg-white/90" onClick={() => setTab('Properties')}>Explore properties <ArrowUpRight size={16}/></Button></div>}
        <div className="flex justify-between mb-4"><h2 className="font-semibold">{admin ? 'Recent transactions' : 'Featured properties'}</h2><button className="text-sm text-primary" onClick={() => setTab(admin ? 'Payments' : 'Properties')}>View all →</button></div>
        {admin ? <PaymentTable payments={data.payments.slice(0, 5)} admin busy={busy} verify={id => action(() => request(`payments/${id}/verify`, 'POST'), 'Payment status refreshed.')}/> : <PropertyGrid properties={data.properties.filter(p => p.status === 'available').slice(0, 3)} onView={setSelected} saved={data.saved} onSave={p => action(() => request(`saved/${p.id}`, data.saved.includes(p.id) ? 'DELETE' : 'POST'))} busy={busy}/>}
      </>}
      {(tab === 'Properties' || tab === 'Saved properties' || tab === 'My listings') && <><div className="flex flex-col sm:flex-row gap-3 mb-6"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-muted-foreground"/><Input aria-label="Search properties" placeholder="Search by property or location" className="pl-10 bg-white" value={search} onChange={e => setSearch(e.target.value)}/></div><select aria-label="Property type" className={`${selectClass} sm:w-48`} value={type} onChange={e => setType(e.target.value)}>{['All', 'House', 'Land', 'Commercial'].map(t => <option key={t}>{t}</option>)}</select></div><PropertyGrid properties={filtered} onView={setSelected} admin={admin} saved={data.saved} busy={busy} onSave={p => action(() => request(`saved/${p.id}`, data.saved.includes(p.id) ? 'DELETE' : 'POST'))}/></>}
      {tab === 'Users' && <div className="bg-white border rounded-2xl overflow-x-auto shadow-sm"><table className="w-full min-w-[640px] text-sm text-left"><thead className="bg-muted"><tr>{['Client', 'Email', 'Joined', 'Action'].map(v => <th key={v} className="p-4">{v}</th>)}</tr></thead><tbody>{clients.map(u => <tr key={u.id} className="border-t"><td className="p-4 font-medium">{u.name}</td><td className="p-4">{u.email}</td><td className="p-4 whitespace-nowrap">{u.created_at.slice(0, 10)}</td><td className="p-4"><Button variant="outline" className="text-destructive" onClick={() => setDeletion({ path: `admin/users/${u.id}`, name: u.name })}>Delete user</Button></td></tr>)}</tbody></table>{!clients.length && <Empty text="No clients yet. Registered accounts will appear here."/>}</div>}
      {admin && tab === 'Properties' && data.properties.some(p => p.approval_status === 'pending') && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5"><h2 className="font-semibold">Listings awaiting approval</h2><div className="mt-4 space-y-3">{data.properties.filter(p => p.approval_status === 'pending').map(p => <div key={p.id} className="flex flex-col gap-3 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground">{p.owner_name} · {money(Number(p.price))}</p></div><div className="flex gap-2"><Button size="sm" onClick={() => action(() => request(`admin/properties/${p.id}/approval`, 'PUT', { approvalStatus: 'approved' }), 'Listing approved.')}>Approve</Button><Button size="sm" variant="outline" onClick={() => action(() => request(`admin/properties/${p.id}/approval`, 'PUT', { approvalStatus: 'rejected' }), 'Listing rejected.')}>Reject</Button></div></div>)}</div></div>}
      {tab === 'Seller KYC' && <div className="space-y-4">{clients.filter(u => u.account_type === 'seller').map(u => <div key={u.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex items-center gap-2"><h2 className="font-semibold">{u.name}</h2><Status value={u.kyc_status}/></div><p className="text-sm text-muted-foreground">{u.email}</p><dl className="mt-4 grid gap-2 text-sm"><div><dt className="text-muted-foreground">ID number</dt><dd>{u.kyc_id_number || 'Not provided'}</dd></div><div><dt className="text-muted-foreground">Phone</dt><dd>{u.kyc_phone || 'Not provided'}</dd></div><div><dt className="text-muted-foreground">Address</dt><dd>{u.kyc_address || 'Not provided'}</dd></div></dl>{u.kyc_document_uploaded ? <Button className="mt-4" size="sm" variant="outline" asChild><a href={`/api/admin/kyc/${u.id}/document`} target="_blank" rel="noreferrer">View KYC document</a></Button> : <p className="mt-4 text-sm text-destructive">No document uploaded</p>}</div>{u.kyc_status === 'pending' && <div className="flex gap-2"><Button size="sm" disabled={!u.kyc_document_uploaded} onClick={() => action(() => request(`admin/kyc/${u.id}`, 'PUT', { status: 'approved' }), 'Seller KYC approved.')}>Approve</Button><Button size="sm" variant="outline" onClick={() => action(() => request(`admin/kyc/${u.id}`, 'PUT', { status: 'rejected' }), 'Seller KYC rejected.')}>Reject</Button></div>}</div></div>)}{!clients.some(u => u.account_type === 'seller') && <Empty text="No seller accounts yet."/>}</div>}
      {seller && tab === 'KYC' && <form className="max-w-2xl space-y-5 rounded-2xl border bg-white p-5 sm:p-7" encType="multipart/form-data" onSubmit={e => { e.preventDefault(); const values = new FormData(e.currentTarget); action(() => portalUpload('client', 'seller/kyc', values), 'KYC submitted for administrator review.'); }}><div><h2 className="text-xl font-semibold">Seller verification</h2><p className="mt-2 text-sm text-muted-foreground">Submit your details and a clear ID image or PDF. You can list properties after an administrator approves your KYC.</p><div className="mt-3"><Status value={data.user.kyc_status}/></div>{data.user.kyc_status === 'rejected' && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">Your KYC was rejected. Correct your details, upload a new document, and submit again.</p>}</div><Field label="National ID or passport number"><Input name="idNumber" defaultValue={data.user.kyc_id_number} minLength={5} maxLength={80} required/></Field><Field label="Phone number"><Input name="phone" type="tel" defaultValue={data.user.kyc_phone} minLength={7} maxLength={30} required/></Field><Field label="Residential or business address"><textarea name="address" defaultValue={data.user.kyc_address} minLength={5} maxLength={250} required className="min-h-24 w-full rounded-md border p-3 text-sm"/></Field><Field label={data.user.kyc_document_uploaded ? 'Replace ID document' : 'Upload ID document'}><Input name="document" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required/><p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WebP or PDF. Maximum 5 MB.</p></Field><Button disabled={busy}>{busy ? 'Uploading…' : data.user.kyc_status === 'rejected' ? 'Re-upload KYC' : 'Submit KYC'}</Button></form>}
      {tab === 'Payments' && <><div className="bg-white border rounded-xl p-5 mb-5 text-sm text-muted-foreground">Payments are confirmed with PayChangu before a property is marked sold. A pending payment reserves the property. {admin && 'Use Check status to reconcile payments with the provider.'}</div><PaymentTable payments={data.payments} admin={admin} busy={busy} verify={id => action(() => request(`payments/${id}/verify`, 'POST'), 'Payment status refreshed.')}/></>}
      {(tab === 'Account' || tab === 'Settings') && <div className="bg-white border rounded-xl p-5 sm:p-7 max-w-2xl space-y-5"><h2 className="text-xl font-semibold">{admin ? 'Workspace settings' : 'Your account'}</h2><div><p className="text-sm text-muted-foreground">Name</p><p>{data.user.name}</p></div><div><p className="text-sm text-muted-foreground">Email</p><p>{data.user.email}</p></div><div><p className="text-sm text-muted-foreground">Account type</p><p className="capitalize">{admin ? data.user.role : data.user.account_type}</p></div><PasswordForm busy={busy} submit={values => action(() => request('account/password', 'PUT', values), 'Password changed successfully.')}/>{admin && <div className="rounded-lg bg-muted p-5"><h3 className="font-semibold">PayChangu mobile money</h3><p className="text-sm mt-2">{data.paymentsConfigured ? 'API key configured. Complete a sandbox payment before going live.' : 'Not configured. Add the PayChangu secret key and webhook secret to the server environment.'}</p><p className="text-xs mt-3 text-muted-foreground">Webhook endpoint: /api/payments/webhook</p></div>}</div>}
    </main>
    <Dialog open={!!selected} onOpenChange={open => { if (!open)
        setSelected(null); }}><DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">{selected && <><DialogHeader><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.location} · {selected.type}</DialogDescription></DialogHeader><img src={selected.image} alt={selected.title} className="w-full h-56 object-cover rounded-xl"/><div className="flex justify-between items-center"><p className="text-2xl text-primary font-semibold">{money(Number(selected.price))}</p><Status value={selected.status}/></div><p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{selected.description}</p>{admin ? <div className="flex gap-3"><Button onClick={() => { setEditor({ ...selected, price: Number(selected.price) }); setSelected(null); }}>Edit property</Button><Button variant="destructive" onClick={() => { setDeletion({ path: `admin/properties/${selected.id}`, name: selected.title }); setSelected(null); }}>Delete property</Button></div> : <><p className="text-xs text-muted-foreground">Full property payment through PayChangu. Legal transfer and supporting documents are arranged with Geoking after payment.</p><Button disabled={busy || selected.status !== 'available' || !data.paymentsConfigured} onClick={() => checkout(selected)}>{busy ? 'Preparing checkout…' : selected.status === 'sold' ? 'Property sold' : 'Pay with mobile money'} <ArrowUpRight size={16}/></Button>{!data.paymentsConfigured && <p className="text-sm text-muted-foreground">Online payments are being set up. Contact Geoking to discuss this property.</p>}</>}</>}</DialogContent></Dialog>
    <Dialog open={!!editor} onOpenChange={open => { if (!open)
        setEditor(null); }}><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editor?.id ? 'Edit property' : 'Add property'}</DialogTitle><DialogDescription>Set the full purchase price in Malawi kwacha.</DialogDescription></DialogHeader>{editor && <form className="space-y-4" onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
            await request(admin ? `admin/properties${editor.id ? '/' + editor.id : ''}` : 'seller/properties', editor.id ? 'PUT' : 'POST', editor);
            setEditor(null);
            await refresh();
            toast.success('Property saved.');
        }
        catch (err) {
            toast.error((err as Error).message);
        }
        finally {
            setBusy(false);
        } }}>
      <Field label="Property title"><Input required minLength={3} maxLength={150} value={editor.title} onChange={e => setEditor({ ...editor, title: e.target.value })}/></Field><Field label="Location"><Input required minLength={3} maxLength={150} value={editor.location} onChange={e => setEditor({ ...editor, location: e.target.value })}/></Field>
      <div className="grid sm:grid-cols-2 gap-4"><Field label="Type"><select className={selectClass} value={editor.type} onChange={e => setEditor({ ...editor, type: e.target.value })}>{['House', 'Land', 'Commercial'].map(t => <option key={t}>{t}</option>)}</select></Field><Field label="Price (MWK)"><Input type="number" min={1} max={999999999} step={1} required value={editor.price || ''} onChange={e => setEditor({ ...editor, price: Number(e.target.value) })}/></Field></div>
      <Field label="Description"><textarea required minLength={10} maxLength={5000} className="w-full border rounded-md p-3 text-sm min-h-24" value={editor.description} onChange={e => setEditor({ ...editor, description: e.target.value })}/></Field>
      <Field label="Listing image"><select className={selectClass} value={editor.image} onChange={e => setEditor({ ...editor, image: e.target.value })}><option value="/assets/property-house.jpg">House image</option><option value="/assets/property-land.jpg">Land image</option><option value="/assets/property-commercial.jpg">Commercial image</option></select></Field>
      {admin && <Field label="Visibility"><select className={selectClass} value={editor.status} onChange={e => setEditor({ ...editor, status: e.target.value })}><option value="draft">Draft</option><option value="available">Available for purchase</option></select></Field>}<Button className="w-full" disabled={busy}>{busy ? 'Saving…' : admin ? 'Save property' : 'Submit for approval'}</Button>
    </form>}</DialogContent></Dialog>
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
    return <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{properties.map(p => <article key={p.id} className="bg-white border rounded-xl overflow-hidden"><div className="relative"><img src={p.image} alt={p.title} className="w-full h-48 object-cover"/><span className="absolute left-4 top-4"><Status value={p.status}/></span>{!admin && <button aria-label={saved.includes(p.id) ? 'Remove from saved properties' : 'Save property'} disabled={busy} onClick={() => onSave(p)} className="absolute right-4 top-4 bg-white rounded-full p-2 text-primary"><Heart size={17} fill={saved.includes(p.id) ? 'currentColor' : 'none'}/></button>}</div><div className="p-5"><p className="text-xs text-muted-foreground mb-2">{p.type}</p><h3 className="font-semibold">{p.title}</h3><p className="flex gap-1 text-sm text-muted-foreground mt-2"><MapPin size={15}/>{p.location}</p><div className="border-t mt-5 pt-4 flex justify-between items-center gap-2"><p className="font-semibold text-primary">{money(Number(p.price))}</p><Button variant="ghost" size="sm" onClick={() => onView(p)}>View <ArrowUpRight size={15}/></Button></div></div></article>)}</div>;
}
function PaymentTable({ payments, admin, busy, verify }: {
    payments: Payment[];
    admin: boolean;
    busy: boolean;
    verify: (id: string) => void;
}) { return <div className="overflow-x-auto rounded-2xl border bg-white"><table className="min-w-[680px] w-full text-left text-sm"><thead className="bg-muted"><tr>{['Property', ...(admin ? ['Client'] : []), 'Amount', 'Status', 'Actions'].map(t => <th className="p-4" key={t}>{t}</th>)}</tr></thead><tbody>{payments.map(p => <tr key={p.id} className="border-t"><td className="p-4"><p className="font-medium">{p.title}</p><p className="text-xs text-muted-foreground mt-1">{p.created_at.slice(0, 10)}</p><p className="text-[10px] text-muted-foreground mt-1 break-all">{p.id}</p></td>{admin && <td className="p-4">{p.customer || 'Deleted account'}</td>}<td className="p-4 whitespace-nowrap">{money(Number(p.amount))}</td><td className="p-4"><Status value={p.status}/></td><td className="p-4">{p.status === 'pending' && <div className="flex gap-2"><Button size="sm" variant="outline" disabled={busy} onClick={() => verify(p.id)}>Check status</Button>{!admin && p.checkout_url && <Button size="sm" asChild><a href={p.checkout_url}>Continue payment</a></Button>}</div>}</td></tr>)}</tbody></table>{!payments.length && <Empty text="No payments yet. Transactions will appear here when checkout starts."/>}</div>; }



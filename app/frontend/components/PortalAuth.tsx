import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, Building2, Store } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = { admin: boolean; register: boolean; busy: boolean; error: string; onModeChange: (register: boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void };
export default function PortalAuth({ admin, register, busy, error, onModeChange, onSubmit }: Props) {
  const [visible, setVisible] = useState(false);
  return <main className="min-h-[100dvh] bg-[#fafbf8] lg:grid lg:grid-cols-[.9fr_1.1fr]">
    <aside className="relative hidden flex-col overflow-hidden bg-secondary p-12 text-white lg:flex xl:p-16">
      <Link to="/" className="flex items-center gap-3"><img src="/assets/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-xl bg-white p-1"/><span className="font-heading text-xl font-bold tracking-tight">GEOKING<span className="text-teal-200">.</span></span></Link>
      <div className="my-auto py-12"><p className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-teal-200">{admin ? 'Geoking administration' : 'Property in Malawi. People you can trust.'}</p><h2 className="font-heading text-4xl font-semibold leading-tight xl:text-5xl">{admin ? <>Every listing.<br/>Every next step.</> : <>Find your place.<br/>Make your move.</>}</h2><p className="mt-6 max-w-md text-base leading-relaxed text-white/75">{admin ? 'Keep your team close to the details that matter, from new clients to seller verification and property sales.' : 'A home, an investment or land for your next project. Start your property journey with Geoking Consultancy.'}</p>
        <div className="mt-10 max-w-md divide-y divide-white/15 border-y border-white/15">{(admin ? [
          ['A clear view of your business', 'Track buyer and seller registrations, listed properties and completed sales.'],
          ['Review with confidence', 'Check seller documents and property details before approving a listing.'],
          ['Stay connected', 'Read client enquiries and keep replies together in one workspace.'],
        ] : [
          ['Buying a property?', 'Explore homes, land and commercial spaces across Malawi. Save your shortlist and return when you are ready.'],
          ['Selling a property?', 'Create a seller account, verify your details and submit your property with photos for our team to review.'],
          ['Support along the way', 'Speak to Geoking about surveying, valuation and the details behind your next move.'],
        ]).map(([heading, detail]) => <div key={heading} className="py-5"><h3 className="font-heading text-base font-semibold text-white">{heading}</h3><p className="mt-2 text-sm leading-relaxed text-white/65">{detail}</p></div>)}</div>
      </div>
      <p className="flex items-center gap-2 text-xs text-white/60"><ShieldCheck size={16} aria-hidden="true"/> {admin ? 'Administrator access only' : 'One account. Your property journey.'}</p>
    </aside>
    <section className="flex min-h-[100dvh] flex-col px-5 py-6 sm:px-10 lg:px-16">
      <div className="flex items-center justify-between gap-4"><Link to="/" className="flex min-h-11 items-center gap-2 text-sm font-medium text-secondary"><ArrowLeft size={16} aria-hidden="true"/> Back to website</Link><span className="font-heading text-sm font-bold text-primary lg:hidden">GEOKING.</span></div>
      <div className="mx-auto my-auto w-full max-w-md py-8 sm:py-12">
        {!admin && <div className="mb-8 grid grid-cols-2 rounded-xl border border-primary/10 bg-[#edf2ed] p-1" aria-label="Account access"><button type="button" disabled={busy} aria-pressed={!register} onClick={() => { setVisible(false); onModeChange(false); }} className={`min-h-11 rounded-lg text-sm font-semibold ${!register ? 'bg-white text-secondary shadow-sm' : 'text-muted-foreground'}`}>Sign in</button><button type="button" disabled={busy} aria-pressed={register} onClick={() => { setVisible(false); onModeChange(true); }} className={`min-h-11 rounded-lg text-sm font-semibold ${register ? 'bg-white text-secondary shadow-sm' : 'text-muted-foreground'}`}>Create account</button></div>}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-primary">{admin ? 'Administration' : 'Welcome to Geoking'}</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{admin ? 'Sign in to your workspace' : register ? 'Make your next move.' : 'Good to see you again.'}</h1>
        <p className="mb-7 mt-3 text-sm leading-relaxed text-muted-foreground">{admin ? 'Use your administrator credentials to continue.' : register ? 'Create an account to buy or sell property in Malawi.' : 'Sign in to explore listings and manage your account.'}</p>
        <form key={`${admin}-${register}`} onSubmit={onSubmit} className="space-y-5" aria-busy={busy}>
          <fieldset disabled={busy} className="space-y-5">
            {register && <label className="block text-sm font-semibold text-secondary" htmlFor="auth-name">Full name<Input id="auth-name" name="name" placeholder="Your full name" autoComplete="name" minLength={2} maxLength={100} required className="mt-2 h-12 rounded-xl bg-white px-4"/></label>}
            <label className="block text-sm font-semibold text-secondary" htmlFor="auth-identifier">{admin ? 'Username' : 'Email address'}<Input id="auth-identifier" name={register ? 'email' : 'identifier'} type={admin ? 'text' : 'email'} placeholder={admin ? 'Your administrator username' : 'you@example.com'} autoComplete={register ? 'email' : 'username'} autoCapitalize="none" spellCheck={false} required className="mt-2 h-12 rounded-xl bg-white px-4"/></label>
            {register && <fieldset><legend className="mb-2 text-sm font-semibold text-secondary">I’m here to</legend><div className="grid grid-cols-2 gap-3">{[['buyer','Buy property',Building2],['seller','Sell property',Store]].map(([value,label,Icon]) => { const ChoiceIcon = Icon as typeof Building2; return <label key={String(value)} className="relative flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 text-sm font-medium text-secondary has-[:checked]:border-primary has-[:checked]:bg-primary/5"><input type="radio" name="accountType" value={String(value)} defaultChecked={value === 'buyer'} className="h-4 w-4 accent-primary"/><ChoiceIcon size={18} aria-hidden="true"/><span>{String(label)}</span></label>; })}</div></fieldset>}
            <div><label htmlFor="auth-password" className="block text-sm font-semibold text-secondary">Password</label><div className="relative mt-2"><Input id="auth-password" name="password" type={visible ? 'text' : 'password'} placeholder={register ? 'At least 12 characters' : 'Enter your password'} autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 12 : 1} maxLength={72} aria-describedby={register ? 'password-help' : undefined} required className="h-12 rounded-xl bg-white pl-4 pr-14"/><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={() => setVisible(value => !value)} className="absolute inset-y-0 right-1 grid w-11 place-items-center text-muted-foreground">{visible ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div>{register && <p id="password-help" className="mt-2 text-xs text-muted-foreground">Use at least 12 characters. A longer, unique passphrase is best.</p>}</div>
            {register && <label htmlFor="auth-confirm" className="block text-sm font-semibold text-secondary">Confirm password<Input id="auth-confirm" name="confirmPassword" type={visible ? 'text' : 'password'} placeholder="Enter your password again" autoComplete="new-password" minLength={12} maxLength={72} required className="mt-2 h-12 rounded-xl bg-white px-4"/></label>}
          </fieldset>
          {error && <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
          <Button disabled={busy} className="h-12 w-full justify-between rounded-xl bg-secondary px-5 text-base">{busy ? 'Please wait…' : register ? 'Create your account' : 'Sign in'}<ArrowRight size={18} aria-hidden="true"/></Button>
        </form>
        {!admin && <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Your details are used to manage your Geoking account. Read our <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link> and <Link to="/terms-of-service" className="underline underline-offset-2">terms</Link>.</p>}
        {admin && <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15}/> Access is limited to authorised administrators.</p>}
      </div>
      <p className="text-center text-[11px] text-muted-foreground">© {new Date().getFullYear()} Geoking Consultancy · Malawi</p>
    </section>
  </main>;
}

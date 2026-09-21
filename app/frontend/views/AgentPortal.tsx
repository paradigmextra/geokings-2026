import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { UserCircle, Lock, Mail, ArrowLeft, Phone, Building2, FileText } from "lucide-react";

const AgentPortal = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "", company: "", bio: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login functionality requires backend integration. Enable Lovable Cloud to proceed.");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      alert("Passwords do not match.");
      return;
    }
    alert("Registration functionality requires backend integration. Enable Lovable Cloud to proceed.");
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-4">
          <Link to="/" className="text-sm text-accent font-medium inline-flex items-center gap-1 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
                <UserCircle className="w-8 h-8" />
              </div>
            </div>

            {mode === "login" ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-center text-foreground mb-1">Agent Sign In</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">Sign in to access your agent dashboard</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" required value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} placeholder="your@email.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="password" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="Enter your password" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="text-right mt-1">
                      <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Sign In
                  </button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-4">
                  Don't have an account?{" "}
                  <button onClick={() => setMode("register")} className="text-accent font-semibold hover:underline">Register</button>
                </p>
              </>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold text-center text-foreground mb-1">Agent Registration</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">Create your agent account with email & password</p>

                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <input required value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} placeholder="Your full name" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                    <input type="email" required value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Password *</label>
                      <input type="password" required value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} placeholder="Password" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Confirm *</label>
                      <input type="password" required value={regForm.confirm} onChange={e => setRegForm({...regForm, confirm: e.target.value})} placeholder="Repeat password" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <input value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} placeholder="Phone (optional)" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <input value={regForm.company} onChange={e => setRegForm({...regForm, company: e.target.value})} placeholder="Company Name (optional)" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <textarea rows={2} value={regForm.bio} onChange={e => setRegForm({...regForm, bio: e.target.value})} placeholder="Brief Bio (optional)" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" /> Create Account
                  </button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-accent font-semibold hover:underline">Sign In</button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentPortal;


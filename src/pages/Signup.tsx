import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Signup() {
  const { user, signup, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  if (!loading && user) return <Navigate to="/app" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signup(email, password);
      nav('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="landing-orb landing-orb-b" aria-hidden />
      <div className="landing-noise" aria-hidden />
      <form className="auth-card" onSubmit={onSubmit}>
        <Link to="/" className="logo logo-mark" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          VOID <span>AI</span>
        </Link>
        <h1>Create account</h1>
        <p className="sub">Tell it what you need. Let it handle the rest.</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@domain.com"
          />
        </div>
        <div className="field">
          <label htmlFor="signup-password">Password (min 8 characters)</label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            placeholder="••••••••"
          />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} disabled={busy}>
          {busy ? (
            <>
              <span className="spinner" /> Creating…
            </>
          ) : (
            'Sign up'
          )}
        </button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

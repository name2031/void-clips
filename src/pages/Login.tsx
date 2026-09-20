import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Login() {
  const { user, login, loading } = useAuth();
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
      await login(email, password);
      nav('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="landing-orb landing-orb-a" aria-hidden />
      <div className="landing-noise" aria-hidden />
      <form className="auth-card" onSubmit={onSubmit}>
        <Link to="/" className="logo logo-mark" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          VOID <span>AI</span>
        </Link>
        <h1>Welcome back</h1>
        <p className="sub">Return to your workspace. Pick up where the signal left off.</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@domain.com"
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} disabled={busy}>
          {busy ? (
            <>
              <span className="spinner" /> Signing in…
            </>
          ) : (
            'Log in'
          )}
        </button>
        <p className="auth-footer">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const FEATURES = [
  {
    title: 'Chat that executes',
    body: 'State the outcome. VOID moves on clear requests — no permission theater for every micro-step.',
  },
  {
    title: 'Projects with memory',
    body: 'Instructions and linked chats stay with the work so context compounds instead of resetting.',
  },
  {
    title: 'Files in the loop',
    body: 'Upload, preview, download, and ask VOID to summarize — documents live beside the conversation.',
  },
  {
    title: 'Preference memory',
    body: 'Store facts about how you work. Toggle anytime. Injected only when you want it.',
  },
];

export default function Landing() {
  const [cmd, setCmd] = useState('');
  const { user } = useAuth();
  const nav = useNavigate();

  const go = () => {
    if (user) {
      nav('/app', { state: cmd ? { draft: cmd } : undefined });
    } else {
      nav('/signup', { state: cmd ? { draft: cmd } : undefined });
    }
  };

  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="logo logo-mark">
          VOID <span>AI</span>
        </Link>
        <div className="nav-actions">
          {user ? (
            <Link className="btn btn-primary" to="/app">
              Open workspace
            </Link>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      <header className="hero">
        <p className="hero-eyebrow">AI workspace</p>
        <h1 className="hero-title">
          Into the void.
          <br />
          <span className="hero-accent">Out with answers.</span>
        </h1>
        <p className="tagline">Tell it what you need. Let it handle the rest.</p>
        <div className="command-cta">
          <span className="command-prefix" aria-hidden>
            ›
          </span>
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Tell VOID what you want to do…"
            onKeyDown={(e) => e.key === 'Enter' && go()}
            aria-label="Command"
          />
          <button className="btn btn-primary" onClick={go}>
            Start
          </button>
        </div>
        <p className="hero-hint">No credit card · Just an account and a clear ask</p>
      </header>

      <div className="sections">
        <div className="section-head">
          <h2 className="section-title">Built to compound</h2>
          <p className="section-sub">Chat, projects, files, and memory — one coherent product.</p>
        </div>
        <div className="grid-caps">
          {FEATURES.map((f) => (
            <div className="card feature-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="final-cta">
          <h2>Silence the noise. Keep the signal.</h2>
          <p>A dark, precise workspace for people who already know what they want done.</p>
          <Link className="btn btn-primary btn-lg" to={user ? '/app' : '/signup'}>
            {user ? 'Enter VOID AI' : 'Create your account'}
          </Link>
        </div>
      </div>

      <footer className="footer">
        <span className="logo logo-mark">
          VOID <span>AI</span>
        </span>
        <span>Tell it what you need. Let it handle the rest.</span>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const FEATURES = [
  {
    kicker: '01',
    title: 'Chat that executes',
    body: 'State the outcome. VOID moves on clear requests — no permission theater for every micro-step.',
  },
  {
    kicker: '02',
    title: 'Projects with memory',
    body: 'Instructions and linked chats stay with the work so context compounds instead of resetting.',
  },
  {
    kicker: '03',
    title: 'Files in the loop',
    body: 'Upload, preview, download, and ask VOID to summarize — documents live beside the conversation.',
  },
  {
    kicker: '04',
    title: 'Preference memory',
    body: 'Store facts about how you work. Toggle anytime. Injected only when you want it.',
  },
  {
    kicker: '05',
    title: 'Honest tools',
    body: 'Extensible registry — calculator, code assist, file summary. If a tool is stubbed, VOID says so.',
  },
  {
    kicker: '06',
    title: 'Workflow chips',
    body: 'Build, Analyze, Create, Research, Write, Code, Plan — start from intent, not a blank page.',
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
      <div className="landing-orb landing-orb-a" aria-hidden />
      <div className="landing-orb landing-orb-b" aria-hidden />
      <div className="landing-noise" aria-hidden />

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
        <div className="hero-badge">
          <span className="pulse-dot" />
          Premium AI workspace
        </div>
        <h1 className="hero-title">
          Into the <em>void</em>.
          <br />
          Out with answers.
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
        <p className="hero-hint">No credit card. Just an account and a clear ask.</p>
      </header>

      <div className="sections">
        <div className="section-head">
          <p className="section-kicker">Capabilities</p>
          <h2 className="section-title">One coherent product</h2>
          <p className="section-sub">Chat, projects, files, and memory — designed to compound.</p>
        </div>
        <div className="grid-3">
          {FEATURES.map((f) => (
            <div className="card feature-card" key={f.title}>
              <span className="feature-kicker">{f.kicker}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="final-cta">
          <p className="section-kicker">Ready</p>
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

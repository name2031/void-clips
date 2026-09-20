import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const FEATURES = [
  { title: 'Chat that executes', body: 'Tell VOID what you need. It moves on clear requests without endless permission loops.' },
  { title: 'Projects', body: 'Keep instructions and linked chats together so context follows the work.' },
  { title: 'Files', body: 'Upload, preview, download, and summarize documents with VOID in one place.' },
  { title: 'Memory', body: 'Store preference facts. Toggle anytime. Injected only when you want it.' },
  { title: 'Tools', body: 'Extensible tool registry — calculator, code assist, file summary, honest web stub.' },
  { title: 'Workflows', body: 'Suggested chips for Build, Analyze, Create, Research, Write, Code, and Plan.' },
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
        <div className="logo">
          VOID <span>AI</span>
        </div>
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
        <div className="hero-badge">Intelligent · Minimal · Fast</div>
        <h1>VOID AI</h1>
        <p className="tagline">Tell it what you need. Let it handle the rest.</p>
        <div className="command-cta">
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Tell VOID what you want to do…"
            onKeyDown={(e) => e.key === 'Enter' && go()}
          />
          <button className="btn btn-primary" onClick={go}>
            Start
          </button>
        </div>
      </header>

      <div className="sections">
        <h2 className="section-title">What it can do</h2>
        <div className="grid-3">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="final-cta">
          <h2>Ready when you are</h2>
          <p>A dark, premium workspace built to feel finished — not demo-ware.</p>
          <Link className="btn btn-primary" to={user ? '/app' : '/signup'}>
            {user ? 'Enter VOID AI' : 'Create your account'}
          </Link>
        </div>
      </div>

      <footer className="footer">VOID AI · Tell it what you need. Let it handle the rest.</footer>
    </div>
  );
}

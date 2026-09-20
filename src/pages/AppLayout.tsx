import { useEffect, useState, useCallback } from 'react';
import { NavLink, Outlet, useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

type Conv = { id: string; title: string; updated_at: string };

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [convs, setConvs] = useState<Conv[]>([]);
  const [q, setQ] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = useNavigate();
  const params = useParams();
  const loc = useLocation();

  const loadConvs = useCallback(async () => {
    try {
      const data = await api<{ conversations: Conv[] }>(
        `/api/conversations${q ? `?q=${encodeURIComponent(q)}` : ''}`
      );
      setConvs(data.conversations);
    } catch {}
  }, [q]);

  useEffect(() => {
    loadConvs();
  }, [loadConvs, loc.pathname]);

  useEffect(() => {
    api<{ settings: { theme: string } }>('/api/settings')
      .then((d) => {
        document.documentElement.setAttribute('data-theme', d.settings.theme || 'dark');
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onRefresh = () => loadConvs();
    window.addEventListener('void:convs', onRefresh);
    return () => window.removeEventListener('void:convs', onRefresh);
  }, [loadConvs]);

  const newChat = async () => {
    const data = await api<{ conversation: Conv }>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: 'New chat' }),
    });
    setSidebarOpen(false);
    nav(`/app/c/${data.conversation.id}`);
    loadConvs();
  };

  const rename = async (id: string) => {
    const title = prompt('Rename conversation');
    if (!title) return;
    await api(`/api/conversations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
    });
    loadConvs();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this conversation?')) return;
    await api(`/api/conversations/${id}`, { method: 'DELETE' });
    if (params.id === id) nav('/app');
    loadConvs();
  };

  const chatActive = loc.pathname === '/app' || loc.pathname.startsWith('/app/c');

  return (
    <div className="app-shell">
      <div
        className={`sidebar-backdrop${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo logo-mark">
            VOID <span>AI</span>
          </Link>
          <button className="btn btn-secondary btn-sm" onClick={newChat} title="New chat">
            + New
          </button>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            className={() => `side-link${chatActive ? ' active' : ''}`}
            to="/app"
            end
            onClick={() => setSidebarOpen(false)}
          >
            <span className="side-ico" aria-hidden>
              ⌁
            </span>
            Chat
          </NavLink>
          <NavLink
            className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}
            to="/app/projects"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="side-ico" aria-hidden>
              ◈
            </span>
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}
            to="/app/files"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="side-ico" aria-hidden>
              ▣
            </span>
            Files
          </NavLink>
          <NavLink
            className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}
            to="/app/settings"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="side-ico" aria-hidden>
              ◎
            </span>
            Settings
          </NavLink>
        </nav>
        <div className="side-section">
          <div className="side-label">Recent</div>
          <div className="search-box">
            <input
              placeholder="Search conversations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search conversations"
            />
          </div>
          {convs.map((c) => (
            <div
              key={c.id}
              className={`conv-item${params.id === c.id ? ' active' : ''}`}
              onClick={() => {
                setSidebarOpen(false);
                nav(`/app/c/${c.id}`);
              }}
            >
              <span className="title">{c.title}</span>
              <span className="actions" onClick={(e) => e.stopPropagation()}>
                <button className="icon-btn" title="Rename" onClick={() => rename(c.id)}>
                  ✎
                </button>
                <button className="icon-btn" title="Delete" onClick={() => remove(c.id)}>
                  ×
                </button>
              </span>
            </div>
          ))}
          {!convs.length && (
            <div className="empty-side">
              <p>No conversations yet</p>
              <button className="btn btn-ghost btn-sm" onClick={newChat}>
                Start one
              </button>
            </div>
          )}
        </div>
        <div className="sidebar-footer">
          <span className="sidebar-email" title={user?.email}>
            {user?.email}
          </span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={async () => {
              await logout();
              nav('/');
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <button className="btn btn-ghost" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            ☰
          </button>
          <div className="logo logo-mark">
            VOID <span>AI</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={newChat}>
            + New
          </button>
        </div>
        <Outlet context={{ refreshConvs: loadConvs, newChat }} />
      </div>
    </div>
  );
}

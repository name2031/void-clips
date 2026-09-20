import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

type Settings = {
  personality: string;
  response_length: string;
  theme: string;
  memory_enabled: boolean;
};

type Memory = { id: string; content: string; enabled: number; created_at: string };

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [newMem, setNewMem] = useState('');
  const [saved, setSaved] = useState(false);

  const load = async () => {
    const s = await api<{ settings: Settings }>('/api/settings');
    setSettings(s.settings);
    document.documentElement.setAttribute('data-theme', s.settings.theme || 'dark');
    const m = await api<{ memories: Memory[] }>('/api/memories');
    setMemories(m.memories);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const patch = async (partial: Partial<Settings>) => {
    if (!settings) return;
    const next = { ...settings, ...partial };
    setSettings(next);
    await api('/api/settings', { method: 'PATCH', body: JSON.stringify(partial) });
    if (partial.theme) document.documentElement.setAttribute('data-theme', partial.theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const addMemory = async () => {
    const content = newMem.trim();
    if (!content) return;
    await api('/api/memories', { method: 'POST', body: JSON.stringify({ content }) });
    setNewMem('');
    const m = await api<{ memories: Memory[] }>('/api/memories');
    setMemories(m.memories);
  };

  const toggleMem = async (id: string, enabled: boolean) => {
    await api(`/api/memories/${id}`, { method: 'PATCH', body: JSON.stringify({ enabled }) });
    setMemories((list) => list.map((x) => (x.id === id ? { ...x, enabled: enabled ? 1 : 0 } : x)));
  };

  const deleteMem = async (id: string) => {
    await api(`/api/memories/${id}`, { method: 'DELETE' });
    setMemories((list) => list.filter((x) => x.id !== id));
  };

  if (!settings) {
    return (
      <div className="page-panel">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="page-panel">
      <div className="page-inner">
        <div className="page-header">
          <h1>Settings</h1>
          {saved && <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>Saved</span>}
        </div>

        <div className="settings-grid">
          <div className="settings-block">
            <h3>Personality</h3>
            <div className="field">
              <select
                value={settings.personality}
                onChange={(e) => patch({ personality: e.target.value })}
              >
                <option value="balanced">Balanced</option>
                <option value="concise">Concise</option>
                <option value="creative">Creative</option>
                <option value="technical">Technical</option>
              </select>
            </div>
          </div>

          <div className="settings-block">
            <h3>Response length</h3>
            <div className="field">
              <select
                value={settings.response_length}
                onChange={(e) => patch({ response_length: e.target.value })}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          <div className="settings-block">
            <h3>Theme</h3>
            <div className="field">
              <select value={settings.theme} onChange={(e) => patch({ theme: e.target.value })}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>

          <div className="settings-block">
            <h3>Memory</h3>
            <div className="toggle-row">
              <span>Inject memories into prompts</span>
              <button
                type="button"
                className={`toggle${settings.memory_enabled ? ' on' : ''}`}
                onClick={() => patch({ memory_enabled: !settings.memory_enabled })}
                aria-label="Toggle memory"
              />
            </div>
            <div className="field" style={{ marginTop: '1rem' }}>
              <label>Add preference fact</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  value={newMem}
                  onChange={(e) => setNewMem(e.target.value)}
                  placeholder="e.g. Prefer TypeScript over JavaScript"
                  onKeyDown={(e) => e.key === 'Enter' && addMemory()}
                />
                <button className="btn btn-secondary" onClick={addMemory}>
                  Add
                </button>
              </div>
            </div>
            {memories.map((m) => (
              <div key={m.id} className="memory-item">
                <button
                  type="button"
                  className={`toggle${m.enabled ? ' on' : ''}`}
                  onClick={() => toggleMem(m.id, !m.enabled)}
                  style={{ flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>{m.content}</div>
                <button className="btn btn-danger" style={{ fontSize: '0.75rem' }} onClick={() => deleteMem(m.id)}>
                  Delete
                </button>
              </div>
            ))}
            {!memories.length && (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No memories stored.</p>
            )}
          </div>

          <div className="settings-block">
            <h3>Account</h3>
            <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {user?.email}
              {user?.is_owner ? ' · Owner' : ''}
            </p>
            <button
              className="btn btn-secondary"
              onClick={async () => {
                await logout();
                nav('/');
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

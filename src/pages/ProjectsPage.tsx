import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

type Project = { id: string; name: string; instructions: string; updated_at: string };
type Conv = { id: string; title: string; updated_at: string };

export default function ProjectsPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [convs, setConvs] = useState<Conv[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');

  const loadList = async () => {
    const d = await api<{ projects: Project[] }>('/api/projects');
    setProjects(d.projects);
  };

  const loadOne = async (pid: string) => {
    const d = await api<{ project: Project; conversations: Conv[] }>(`/api/projects/${pid}`);
    setProject(d.project);
    setConvs(d.conversations);
    setName(d.project.name);
    setInstructions(d.project.instructions || '');
  };

  useEffect(() => {
    loadList().catch(() => {});
  }, []);

  useEffect(() => {
    if (id) loadOne(id).catch(() => nav('/app/projects'));
    else {
      setProject(null);
      setConvs([]);
    }
  }, [id, nav]);

  const create = async () => {
    const d = await api<{ project: Project }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name: name || 'Untitled project', instructions }),
    });
    setShowNew(false);
    setName('');
    setInstructions('');
    await loadList();
    nav(`/app/projects/${d.project.id}`);
  };

  const save = async () => {
    if (!project) return;
    await api(`/api/projects/${project.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name, instructions }),
    });
    await loadOne(project.id);
    await loadList();
  };

  const remove = async () => {
    if (!project || !confirm('Delete this project?')) return;
    await api(`/api/projects/${project.id}`, { method: 'DELETE' });
    nav('/app/projects');
    loadList();
  };

  const openChat = async () => {
    if (!project) return;
    const d = await api<{ conversation: { id: string } }>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: 'New chat', project_id: project.id }),
    });
    nav(`/app/c/${d.conversation.id}`);
  };

  if (id && project) {
    return (
      <div className="page-panel">
        <div className="page-inner">
          <div className="page-header">
            <h1>{project.name}</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={() => nav('/app/projects')}>
                Back
              </button>
              <button className="btn btn-primary" onClick={openChat}>
                New chat in project
              </button>
            </div>
          </div>
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label>Project instructions (injected into system prompt)</label>
            <textarea rows={6} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
            <button className="btn btn-danger" onClick={remove}>
              Delete
            </button>
          </div>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Linked chats</h3>
          {convs.map((c) => (
            <div key={c.id} className="list-row" style={{ cursor: 'pointer' }} onClick={() => nav(`/app/c/${c.id}`)}>
              <div className="meta">
                <div className="name">{c.title}</div>
                <div className="sub">{new Date(c.updated_at).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {!convs.length && <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>No linked chats yet.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="page-panel">
      <div className="page-inner">
        <div className="page-header">
          <h1>Projects</h1>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}>
            New project
          </button>
        </div>
        {projects.map((p) => (
          <div key={p.id} className="list-row" style={{ cursor: 'pointer' }} onClick={() => nav(`/app/projects/${p.id}`)}>
            <div className="meta">
              <div className="name">{p.name}</div>
              <div className="sub">Updated {new Date(p.updated_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
        {!projects.length && <p style={{ color: 'var(--text-dim)' }}>No projects yet. Create one to keep context together.</p>}
      </div>

      {showNew && (
        <div className="modal-backdrop" onClick={() => setShowNew(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New project</h2>
            <div className="field">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
            </div>
            <div className="field">
              <label>Instructions</label>
              <textarea rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Context for VOID…" />
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowNew(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

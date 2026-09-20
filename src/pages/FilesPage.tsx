import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getToken } from '../lib/api';

type FileRow = {
  id: string;
  original_name: string;
  mime_type: string;
  size: number;
  created_at: string;
};

function formatSize(n: number) {
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [preview, setPreview] = useState<{
    type: string;
    content?: string;
    url?: string;
    name?: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const load = async () => {
    const d = await api<{ files: FileRow[] }>('/api/files');
    setFiles(d.files);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = getToken();
      const res = await fetch('/api/files', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Upload failed');
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const showPreview = async (f: FileRow) => {
    const d = await api<{
      preview: { type: string; content?: string; url?: string };
    }>(`/api/files/${f.id}?preview=1`);
    if (d.preview.type === 'image') {
      const token = getToken();
      const res = await fetch(`/api/files/${f.id}/download`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      const blob = await res.blob();
      setPreview({ type: 'image', url: URL.createObjectURL(blob), name: f.original_name });
      return;
    }
    setPreview({ ...d.preview, name: f.original_name });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    await api(`/api/files/${id}`, { method: 'DELETE' });
    if (preview) setPreview(null);
    load();
  };

  const download = (id: string, name: string) => {
    const token = getToken();
    const a = document.createElement('a');
    a.href = `/api/files/${id}/download`;
    a.download = name;
    // open with auth via fetch blob
    fetch(a.href, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: 'include',
    })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  const summarize = async (f: FileRow) => {
    const conv = await api<{ conversation: { id: string } }>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: `Summarize: ${f.original_name}` }),
    });
    // Navigate to chat; store file intent in sessionStorage for ChatPage... 
    // Simpler: post first message via a dedicated flow — navigate with state
    sessionStorage.setItem(
      'void_pending_summarize',
      JSON.stringify({ conversation_id: conv.conversation.id, file_id: f.id, name: f.original_name })
    );
    nav(`/app/c/${conv.conversation.id}`, { state: { summarizeFileId: f.id, summarizeName: f.original_name } });
  };

  return (
    <div className="page-panel">
      <div className="page-inner">
        <div className="page-header">
          <h1>Files</h1>
          <button className="btn btn-primary" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? 'Uploading…' : 'Upload'}
          </button>
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = '';
            }}
          />
        </div>

        {files.map((f) => (
          <div key={f.id} className="list-row">
            <div className="meta">
              <div className="name">{f.original_name}</div>
              <div className="sub">
                {f.mime_type || 'file'} · {formatSize(f.size)} · {new Date(f.created_at).toLocaleString()}
              </div>
            </div>
            <div className="row-actions">
              <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }} onClick={() => showPreview(f)}>
                Preview
              </button>
              <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }} onClick={() => download(f.id, f.original_name)}>
                Download
              </button>
              <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => summarize(f)}>
                Summarize with VOID
              </button>
              <button className="btn btn-danger" style={{ fontSize: '0.8rem' }} onClick={() => remove(f.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {!files.length && <p style={{ color: 'var(--text-dim)' }}>No files uploaded yet.</p>}

        {preview && (
          <div className="preview-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <strong>{preview.name}</strong>
              <button className="btn btn-ghost" onClick={() => setPreview(null)}>
                Close
              </button>
            </div>
            {preview.type === 'text' && <pre>{preview.content}</pre>}
            {preview.type === 'image' && preview.url && (
              <img src={preview.url} alt={preview.name} />
            )}
            {preview.type === 'none' && <p style={{ color: 'var(--text-muted)' }}>No text/image preview for this type.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

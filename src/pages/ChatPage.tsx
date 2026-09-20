import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams, useLocation, useOutletContext } from 'react-router-dom';
import { api, streamChat } from '../lib/api';
import MessageBubble, { Msg } from '../components/MessageBubble';

const CHIPS = [
  { label: 'Build', prompt: 'Help me build ' },
  { label: 'Analyze', prompt: 'Analyze this: ' },
  { label: 'Create', prompt: 'Create ' },
  { label: 'Research', prompt: 'Research ' },
  { label: 'Write', prompt: 'Write ' },
  { label: 'Code', prompt: 'Write code for ' },
  { label: 'Plan', prompt: 'Make a plan for ' },
];

type OutletCtx = { refreshConvs: () => void; newChat: () => void };

export default function ChatPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const { refreshConvs } = useOutletContext<OutletCtx>();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [convId, setConvId] = useState<string | null>(id || null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const runStreamRef = useRef<(body: Record<string, unknown>, optimisticUser?: Msg) => Promise<void>>(async () => {});
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const draft = (loc.state as { draft?: string } | null)?.draft;
    if (draft) {
      setInput(draft);
      nav(loc.pathname, { replace: true, state: {} });
    }
  }, [loc, nav]);

  const pendingSummarize = useRef<{ fileId: string; name: string } | null>(null);

  useEffect(() => {
    const st = loc.state as { summarizeFileId?: string; summarizeName?: string } | null;
    if (st?.summarizeFileId) {
      pendingSummarize.current = { fileId: st.summarizeFileId, name: st.summarizeName || 'file' };
      nav(loc.pathname, { replace: true, state: {} });
    }
  }, [loc, nav]);

  const load = useCallback(async (cid: string) => {
    const data = await api<{ messages: Msg[] }>(`/api/conversations/${cid}`);
    setMessages(data.messages);
    setConvId(cid);
  }, []);

  useEffect(() => {
    if (id) {
      load(id)
        .then(() => {
          const pending = pendingSummarize.current;
          if (!pending) return;
          pendingSummarize.current = null;
          const content = `Summarize this file and extract the key points: ${pending.name}`;
          const optimistic: Msg = { id: 'temp-' + Date.now(), role: 'user', content };
          runStreamRef.current(
            { content, file_id: pending.fileId, conversation_id: id },
            optimistic
          );
        })
        .catch(() => nav('/app'));
    } else {
      setMessages([]);
      setConvId(null);
    }
  }, [id, load, nav]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [input]);

  const ensureConv = async () => {
    if (convId) return convId;
    const data = await api<{ conversation: { id: string } }>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: 'New chat' }),
    });
    setConvId(data.conversation.id);
    nav(`/app/c/${data.conversation.id}`, { replace: true });
    return data.conversation.id;
  };

  const runStream = async (body: Record<string, unknown>, optimisticUser?: Msg) => {
    const cid = (body.conversation_id as string) || (await ensureConv());
    body.conversation_id = cid;

    if (optimisticUser) {
      setMessages((m) => [...m, optimisticUser]);
    }

    const assistantId = 'streaming-' + Date.now();
    setMessages((m) => [...m, { id: assistantId, role: 'assistant', content: '', streaming: true }]);
    setStreaming(true);

    const ac = new AbortController();
    abortRef.current = ac;

    let acc = '';
    try {
      await streamChat(
        body,
        {
          onToken: (t) => {
            acc += t;
            setMessages((m) =>
              m.map((x) => (x.id === assistantId ? { ...x, content: acc } : x))
            );
          },
          onDone: (messageId) => {
            setMessages((m) =>
              m.map((x) =>
                x.id === assistantId
                  ? { ...x, id: messageId || x.id, streaming: false, content: acc }
                  : x
              )
            );
            refreshConvs();
          },
          onError: (err) => {
            if (!acc) {
              setMessages((m) =>
                m.map((x) =>
                  x.id === assistantId
                    ? { ...x, content: `Error: ${err}`, streaming: false }
                    : x
                )
              );
            }
          },
        },
        ac.signal
      );
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        const msg = e instanceof Error ? e.message : 'Failed';
        setMessages((m) =>
          m.map((x) =>
            x.id === assistantId && !x.content
              ? { ...x, content: `Error: ${msg}`, streaming: false }
              : { ...x, streaming: false }
          )
        );
      } else {
        setMessages((m) => m.map((x) => ({ ...x, streaming: false })));
        refreshConvs();
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      // reload for consistent IDs
      if (cid) {
        try {
          await load(cid);
        } catch {}
      }
    }
  };

  runStreamRef.current = runStream;

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput('');
    setEditingId(null);

    if (editingId) {
      await runStream({ content, edit_message_id: editingId });
      return;
    }

    const optimistic: Msg = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content,
    };
    await runStream({ content }, optimistic);
  };

  const stop = () => {
    abortRef.current?.abort();
  };

  const regenerate = async () => {
    if (streaming || !convId) return;
    setMessages((m) => {
      const copy = [...m];
      while (copy.length && copy[copy.length - 1].role === 'assistant') copy.pop();
      return copy;
    });
    await runStream({ regenerate: true, conversation_id: convId });
  };

  const startEdit = (msg: Msg) => {
    setEditingId(msg.id);
    setInput(msg.content);
    taRef.current?.focus();
  };

  const lastUserIdx = [...messages].map((m) => m.role).lastIndexOf('user');
  const lastAsstIdx = [...messages].map((m) => m.role).lastIndexOf('assistant');

  return (
    <>
      <div className="chat-area">
        <div className="chat-inner">
          {!messages.length && (
            <div className="empty-chat">
              <h2>VOID AI</h2>
              <p>Tell it what you need. Let it handle the rest.</p>
              <div className="chips">
                {CHIPS.map((c) => (
                  <button key={c.label} className="chip" onClick={() => setInput(c.prompt)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <MessageBubble
              key={m.id}
              msg={m}
              isLastUser={i === lastUserIdx}
              isLastAssistant={i === lastAsstIdx && !streaming}
              onCopy={() => navigator.clipboard.writeText(m.content)}
              onRegenerate={i === lastAsstIdx ? regenerate : undefined}
              onEdit={i === lastUserIdx ? () => startEdit(m) : undefined}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="composer-wrap">
        {editingId && (
          <div style={{ maxWidth: 760, margin: '0 auto 0.5rem', fontSize: '0.8rem', color: 'var(--accent)' }}>
            Editing message — send to replace{' '}
            <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }} onClick={() => { setEditingId(null); setInput(''); }}>
              Cancel
            </button>
          </div>
        )}
        <div className="composer">
          <textarea
            ref={taRef}
            rows={1}
            placeholder="Tell VOID what you want to do…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            disabled={streaming && !editingId ? false : false}
          />
          {streaming ? (
            <button className="btn btn-secondary" onClick={stop}>
              Stop
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => send()} disabled={!input.trim()}>
              Send
            </button>
          )}
        </div>
      </div>
    </>
  );
}

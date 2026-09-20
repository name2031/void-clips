import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export type Msg = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  streaming?: boolean;
};

type Props = {
  msg: Msg;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  isLastAssistant?: boolean;
  isLastUser?: boolean;
};

export default function MessageBubble({
  msg,
  onCopy,
  onRegenerate,
  onEdit,
  isLastAssistant,
  isLastUser,
}: Props) {
  if (msg.role === 'system') return null;
  return (
    <div className={`msg ${msg.role}${msg.streaming ? ' streaming' : ''}`}>
      <div className="msg-avatar">{msg.role === 'assistant' ? 'V' : 'U'}</div>
      <div className="msg-body">
        <div className="msg-role">{msg.role === 'assistant' ? 'VOID' : 'You'}</div>
        <div className="msg-content">
          {msg.role === 'assistant' ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {msg.content || (msg.streaming ? '▍' : '')}
            </ReactMarkdown>
          ) : (
            <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</p>
          )}
          {msg.streaming && !msg.content && <span className="spinner" />}
        </div>
        <div className="msg-actions">
          <button className="btn btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={onCopy}>
            Copy
          </button>
          {isLastUser && onEdit && (
            <button className="btn btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={onEdit}>
              Edit
            </button>
          )}
          {isLastAssistant && onRegenerate && (
            <button className="btn btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={onRegenerate}>
              Regenerate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

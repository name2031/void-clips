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
      <div className="msg-avatar" aria-hidden>
        {msg.role === 'assistant' ? 'V' : 'U'}
      </div>
      <div className="msg-body">
        <div className="msg-role">{msg.role === 'assistant' ? 'VOID' : 'You'}</div>
        <div className="msg-content">
          {msg.role === 'assistant' ? (
            <>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {msg.content || ''}
              </ReactMarkdown>
              {msg.streaming && <span className="stream-caret" aria-hidden />}
              {msg.streaming && !msg.content && (
                <span className="thinking">
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                </span>
              )}
            </>
          ) : (
            <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</p>
          )}
        </div>
        <div className="msg-actions">
          <button className="btn btn-ghost btn-sm" onClick={onCopy}>
            Copy
          </button>
          {isLastUser && onEdit && (
            <button className="btn btn-ghost btn-sm" onClick={onEdit}>
              Edit
            </button>
          )}
          {isLastAssistant && onRegenerate && (
            <button className="btn btn-ghost btn-sm" onClick={onRegenerate}>
              Regenerate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

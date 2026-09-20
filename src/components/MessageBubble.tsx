import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export type Msg = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  streaming?: boolean;
  error?: boolean;
};

type Props = {
  msg: Msg;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onRetry?: () => void;
  onEdit?: () => void;
  isLastAssistant?: boolean;
  isLastUser?: boolean;
};

export default function MessageBubble({
  msg,
  onCopy,
  onRegenerate,
  onRetry,
  onEdit,
  isLastAssistant,
  isLastUser,
}: Props) {
  if (msg.role === 'system') return null;

  const isError =
    msg.error ||
    (msg.role === 'assistant' &&
      !msg.streaming &&
      !!msg.content &&
      (/^Error:/i.test(msg.content) || /^Sorry —/i.test(msg.content)));

  return (
    <div
      className={`msg ${msg.role}${msg.streaming ? ' streaming' : ''}${isError ? ' is-error' : ''}`}
    >
      <div className="msg-avatar" aria-hidden>
        {msg.role === 'assistant' ? 'V' : 'U'}
      </div>
      <div className="msg-body">
        <div className="msg-role">{msg.role === 'assistant' ? 'VOID' : 'You'}</div>
        <div className="msg-content">
          {msg.role === 'assistant' ? (
            <>
              {msg.streaming && !msg.content ? (
                <span className="thinking" aria-label="Thinking">
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-label">Thinking</span>
                </span>
              ) : (
                <>
                  {isError ? (
                    <div className="msg-error-banner" role="alert">
                      <span className="msg-error-ico" aria-hidden>
                        !
                      </span>
                      <div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                          {msg.content || ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                      {msg.content || ''}
                    </ReactMarkdown>
                  )}
                  {msg.streaming && msg.content && <span className="stream-caret" aria-hidden />}
                </>
              )}
            </>
          ) : (
            <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</p>
          )}
        </div>
        <div className="msg-actions">
          {!isError && (
            <button className="btn btn-ghost btn-sm" onClick={onCopy}>
              Copy
            </button>
          )}
          {isLastUser && onEdit && (
            <button className="btn btn-ghost btn-sm" onClick={onEdit}>
              Edit
            </button>
          )}
          {isError && onRetry && (
            <button className="btn btn-secondary btn-sm" onClick={onRetry}>
              Retry
            </button>
          )}
          {isLastAssistant && onRegenerate && !isError && (
            <button className="btn btn-ghost btn-sm" onClick={onRegenerate}>
              Regenerate
            </button>
          )}
          {isLastAssistant && isError && onRegenerate && !onRetry && (
            <button className="btn btn-secondary btn-sm" onClick={onRegenerate}>
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

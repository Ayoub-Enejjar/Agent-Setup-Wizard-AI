import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Sparkles, Trash2 } from 'lucide-react';
import { useAgent } from '../context/agentContext';
import { streamChatWithAgent } from '../services/mistralService';

const AIChatWidget = () => {
  const { config, conversations, addConversation, clearConversations, isChatOpen, openChat, closeChat } = useAgent();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Don't render if agent isn't set up
  if (!config.isSetup) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, streamingContent]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput('');
    setError(null);

    const userMsg = { role: 'user', content: text };
    addConversation(userMsg);

    setIsTyping(true);
    setStreamingContent('');

    try {
      const allMessages = [...conversations, userMsg];
      const finalContent = await streamChatWithAgent(
        allMessages,
        config,
        (fullText) => {
          setStreamingContent(fullText);
        }
      );
      addConversation({ role: 'assistant', content: finalContent });
      setStreamingContent('');
    } catch (err) {
      setError(err.message || 'Failed to get response. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const personalityEmoji = {
    professional: '💼', friendly: '😊', expert: '🧠', casual: '☕'
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isChatOpen && (
        <button onClick={openChat} style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(139,92,246,0.4), 0 0 0 0 rgba(139,92,246,0.4)',
          transition: 'all 0.3s ease', color: '#fff',
          animation: 'chatPulse 2s ease-in-out infinite',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(139,92,246,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.4)'; }}
        >
          <MessageSquare size={26} />
          {conversations.filter(m => m.role === 'assistant').length === 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -2, width: 16, height: 16,
              borderRadius: '50%', background: '#a8ff3e',
              border: '2px solid #060610', fontSize: '0.6rem', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }} />
          )}
        </button>
      )}

      {/* Chat panel */}
      {isChatOpen && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 400, maxWidth: 'calc(100vw - 48px)',
          height: 560, maxHeight: 'calc(100vh - 100px)',
          background: 'rgba(10,10,24,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 20, display: 'flex', flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.1)',
          animation: 'chatSlideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08))',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'linear-gradient(135deg, #8b5cf6, #a8ff3e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={20} color="#060610" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f5f3ef', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {config.businessName || 'AI Agent'}
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a8ff3e', display: 'inline-block', boxShadow: '0 0 8px rgba(168,255,62,0.6)' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(245,243,239,0.4)' }}>
                  {personalityEmoji[config.personality] || '💼'} {config.personality} mode · Online
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {conversations.length > 0 && (
                <button onClick={clearConversations} style={{
                  all: 'unset', cursor: 'pointer', width: 32, height: 32,
                  borderRadius: 8, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'rgba(245,243,239,0.3)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#f5f3ef'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(245,243,239,0.3)'; }}
                  title="Clear conversation"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <button onClick={closeChat} style={{
                all: 'unset', cursor: 'pointer', width: 32, height: 32,
                borderRadius: 8, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'rgba(245,243,239,0.4)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#f5f3ef'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(245,243,239,0.4)'; }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {conversations.length === 0 && !streamingContent && (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 12,
                padding: '2rem 1rem', textAlign: 'center',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={24} color="#a78bfa" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f5f3ef', marginBottom: 4, fontSize: '0.95rem' }}>
                    Hi! I'm {config.businessName || 'your AI'} assistant
                  </div>
                  <div style={{ color: 'rgba(245,243,239,0.35)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                    Ask me anything about our services, book an appointment, or just say hello!
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 8 }}>
                  {['What services do you offer?', 'Book an appointment', 'Pricing info'].map(q => (
                    <button key={q} onClick={() => { setInput(q); }} style={{
                      all: 'unset', cursor: 'pointer', fontSize: '0.75rem',
                      padding: '6px 12px', borderRadius: 100,
                      background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
                      color: '#c4b5fd', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {conversations.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'msgFadeIn 0.3s ease-out',
              }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px', borderRadius: 14,
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: '#f5f3ef', fontSize: '0.85rem', lineHeight: 1.65,
                  borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: msg.role === 'user' ? 14 : 4,
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {streamingContent && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'msgFadeIn 0.3s ease-out' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f5f3ef', fontSize: '0.85rem', lineHeight: 1.65,
                  borderBottomLeftRadius: 4, wordBreak: 'break-word',
                }}>
                  {streamingContent}
                  <span style={{ display: 'inline-block', width: 5, height: 14, background: '#a78bfa', marginLeft: 2, animation: 'blink 0.8s infinite', verticalAlign: 'text-bottom', borderRadius: 1 }} />
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && !streamingContent && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 18px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  borderBottomLeftRadius: 4, display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.2s infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.4s infinite' }} />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                padding: '10px 14px', borderRadius: 12,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#fca5a5', fontSize: '0.8rem',
              }}>
                ⚠️ {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '12px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(6,6,16,0.5)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '4px 4px 4px 16px',
              transition: 'border-color 0.2s',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isTyping}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: '#f5f3ef', fontSize: '0.88rem', fontFamily: 'inherit',
                  padding: '8px 0',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: input.trim() && !isTyping ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.05)',
                  border: 'none', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: input.trim() && !isTyping ? '#fff' : 'rgba(245,243,239,0.2)',
                  transition: 'all 0.2s', flexShrink: 0,
                }}
              >
                {isTyping ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
              </button>
            </div>
            <div style={{
              textAlign: 'center', marginTop: 8, fontSize: '0.65rem',
              color: 'rgba(245,243,239,0.2)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 4,
            }}>
              <Sparkles size={9} /> Powered by Mistral AI · Rocket.new
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(139,92,246,0.4), 0 0 0 0 rgba(139,92,246,0.3); }
          50% { box-shadow: 0 8px 32px rgba(139,92,246,0.4), 0 0 0 8px rgba(139,92,246,0); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default AIChatWidget;

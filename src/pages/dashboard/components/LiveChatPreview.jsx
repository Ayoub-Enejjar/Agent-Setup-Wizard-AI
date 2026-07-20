import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Instagram, Globe, MessageSquare, MoreHorizontal, ArrowLeft, MoreVertical, Pause, Play, Send, Loader2, Bot } from 'lucide-react';
import { useAgent } from '../../../context/agentContext';
import { streamChatWithAgent } from '../../../services/mistralService';

const LiveChatPreview = () => {
  const { config, openChat } = useAgent();
  const [isOnline, setIsOnline] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);

  const chatPreviews = [
    {
      id: 1, customer: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hi, I need help with booking an appointment',
      timestamp: new Date(Date.now() - 120000), unread: 2, status: 'typing', channel: 'whatsapp'
    },
    {
      id: 2, customer: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'What are your pricing options?',
      timestamp: new Date(Date.now() - 300000), unread: 0, status: 'online', channel: 'web'
    },
    {
      id: 3, customer: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thank you for the quick response!',
      timestamp: new Date(Date.now() - 900000), unread: 0, status: 'away', channel: 'instagram'
    }
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return MessageCircle;
      case 'instagram': return Instagram;
      case 'web': return Globe;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'typing': return '#8b5cf6';
      case 'away': return '#eab308';
      default: return '#6b7280';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, streamingText]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isTyping) return;
    setInputText('');

    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    setLocalMessages(prev => [...prev, userMsg]);

    setIsTyping(true);
    setStreamingText('');

    try {
      const allMsgs = [...localMessages, userMsg];
      const finalContent = await streamChatWithAgent(allMsgs, config, (fullText) => {
        setStreamingText(fullText);
      });
      setLocalMessages(prev => [...prev, { role: 'assistant', content: finalContent, timestamp: new Date() }]);
      setStreamingText('');
    } catch (err) {
      setLocalMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ background: 'rgba(14,14,28,0.6)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f5f3ef' }}>Live Chat</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isOnline ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.4)' }}>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.35)' }}>3 active conversations</span>
          <button onClick={() => setIsOnline(!isOnline)} style={{
            all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.75rem', color: 'rgba(245,243,239,0.4)', padding: '4px 8px', borderRadius: 6,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {isOnline ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {!selectedChat ? (
          <div style={{ height: '100%', overflowY: 'auto' }}>
            {chatPreviews.map((chat) => {
              const ChannelIcon = getChannelIcon(chat.channel);
              return (
                <div key={chat.id} onClick={() => { setSelectedChat(chat); setLocalMessages([{ role: 'user', content: chat.lastMessage, timestamp: chat.timestamp }]); }}
                  style={{
                    padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                        <img src={chat.avatar} alt={chat.customer} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: '50%', background: getStatusColor(chat.status), border: '2px solid #0e0e1c' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 500, fontSize: '0.85rem', color: '#f5f3ef' }}>{chat.customer}</span>
                          <ChannelIcon size={12} style={{ color: 'rgba(245,243,239,0.3)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.25)' }}>{formatTime(chat.timestamp)}</span>
                          {chat.unread > 0 && (
                            <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#8b5cf6', fontSize: '0.65rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chat.unread}</span>
                          )}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(245,243,239,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {chat.status === 'typing' ? (
                          <span style={{ fontStyle: 'italic', color: '#a78bfa' }}>typing...</span>
                        ) : chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat header */}
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => { setSelectedChat(null); setLocalMessages([]); setStreamingText(''); }}
                  style={{ all: 'unset', cursor: 'pointer', color: 'rgba(245,243,239,0.4)', display: 'flex' }}>
                  <ArrowLeft size={16} />
                </button>
                <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                  <img src={selectedChat.avatar} alt={selectedChat.customer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.85rem', color: '#f5f3ef' }}>{selectedChat.customer}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', textTransform: 'capitalize' }}>{isTyping ? 'AI is typing...' : selectedChat.status}</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {localMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '80%', padding: '8px 12px', borderRadius: 12, fontSize: '0.82rem', lineHeight: 1.55,
                    background: msg.role === 'assistant' ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.15))' : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'assistant' ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.06)',
                    color: '#f5f3ef',
                  }}>
                    {msg.role === 'assistant' && <div style={{ fontSize: '0.65rem', color: '#a78bfa', marginBottom: 3, fontWeight: 600 }}>AI Agent</div>}
                    {msg.content}
                    <div style={{ fontSize: '0.65rem', color: 'rgba(245,243,239,0.2)', marginTop: 4 }}>{formatTime(msg.timestamp)}</div>
                  </div>
                </div>
              ))}
              {streamingText && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    maxWidth: '80%', padding: '8px 12px', borderRadius: 12, fontSize: '0.82rem', lineHeight: 1.55,
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.15))',
                    border: '1px solid rgba(139,92,246,0.2)', color: '#f5f3ef',
                  }}>
                    <div style={{ fontSize: '0.65rem', color: '#a78bfa', marginBottom: 3, fontWeight: 600 }}>AI Agent</div>
                    {streamingText}
                    <span style={{ display: 'inline-block', width: 4, height: 12, background: '#a78bfa', marginLeft: 2, animation: 'blink 0.8s infinite', verticalAlign: 'text-bottom', borderRadius: 1 }} />
                  </div>
                </div>
              )}
              {isTyping && !streamingText && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ padding: '10px 16px', borderRadius: 12, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out infinite' }} />
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.2s infinite' }} />
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.4s infinite' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.6rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <button onClick={openChat} style={{
                  all: 'unset', cursor: 'pointer', fontSize: '0.72rem', padding: '5px 10px', borderRadius: 6,
                  background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', color: '#a78bfa',
                }}>
                  <Bot size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} /> Full chat
                </button>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="text" value={inputText} onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                  placeholder="Reply with AI..."
                  disabled={isTyping}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8, padding: '7px 12px', fontSize: '0.8rem', color: '#f5f3ef',
                    outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                    background: inputText.trim() && !isTyping ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                  {isTyping ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LiveChatPreview;
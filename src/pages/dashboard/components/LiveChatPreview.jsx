import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Instagram, Globe, MessageSquare, ArrowLeft, Send, Loader2, Bot, Sparkles, Brain, Check, ShieldAlert, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react';
import { useAgent } from '../../../context/agentContext';
import { streamChatWithAgent, extractDataFromConversation } from '../../../services/mistralService';

const LiveChatPreview = () => {
  const { config, openChat } = useAgent();
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  
  // Settings for testing / simulation
  const [autopilot, setAutopilot] = useState(true);
  const [simulateInput, setSimulateInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  
  // Extracted data state
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const messagesEndRef = useRef(null);

  const [chatPreviews, setChatPreviews] = useState([
    {
      id: 1, customer: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hi, I need help with booking an appointment for hair color tomorrow.',
      timestamp: new Date(Date.now() - 120000), unread: 2, status: 'online', channel: 'whatsapp',
      phone: '+1 (555) 304-2918', email: 'sarah.j@example.com'
    },
    {
      id: 2, customer: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'What are your pricing options for delivery services?',
      timestamp: new Date(Date.now() - 300000), unread: 0, status: 'online', channel: 'web',
      phone: 'Not provided', email: 'mchen92@gmail.com'
    },
    {
      id: 3, customer: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I would like to order one of your repair services. Let me know when you are free.',
      timestamp: new Date(Date.now() - 900000), unread: 0, status: 'away', channel: 'instagram',
      phone: '+1 (555) 902-8812', email: 'emma_r@instagram.com'
    }
  ]);

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return MessageCircle;
      case 'instagram': return Instagram;
      case 'web': return Globe;
      default: return MessageSquare;
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'whatsapp': return '#22c55e';
      case 'instagram': return '#ec4899';
      case 'web': return '#6366f1';
      default: return '#a78bfa';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, streamingText]);

  // Extract structured details using Mistral
  const handleExtractData = async () => {
    if (localMessages.length === 0) return;
    setIsExtracting(true);
    try {
      const data = await extractDataFromConversation(localMessages);
      setExtractedData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Owner responds manually (Intervention mode)
  const handleSendMessageAsOwner = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');

    // Append owner reply directly. Does NOT trigger AI.
    const ownerMsg = { role: 'assistant', content: text, timestamp: new Date(), isOwner: true };
    setLocalMessages(prev => [...prev, ownerMsg]);
    
    // Reset data extraction since history changed
    setExtractedData(null);
  };

  // Simulate a Customer inbound message (e.g. from WhatsApp/Instagram)
  const handleSimulateInbound = async () => {
    const text = simulateInput.trim();
    if (!text) return;
    setSimulateInput('');

    const customerMsg = { role: 'user', content: text, timestamp: new Date() };
    const updatedMessages = [...localMessages, customerMsg];
    setLocalMessages(updatedMessages);
    setExtractedData(null);

    // If autopilot is enabled, the AI responds automatically!
    if (autopilot) {
      setIsTyping(true);
      setStreamingText('');
      try {
        const finalContent = await streamChatWithAgent(updatedMessages, config, (fullText) => {
          setStreamingText(fullText);
        });
        setLocalMessages(prev => [...prev, { role: 'assistant', content: finalContent, timestamp: new Date() }]);
        setStreamingText('');
      } catch (err) {
        setLocalMessages(prev => [...prev, { role: 'assistant', content: 'Apologies, I encountered an error answering this.', timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div style={{
      background: 'rgba(10,10,24,0.6)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20, height: '620px', display: 'flex', overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
    }}>
      {/* 1. Left Column: Chat Previews */}
      <div style={{
        width: '32%', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', background: 'rgba(6,6,16,0.3)'
      }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f5f3ef', letterSpacing: '-0.01em' }}>Inbound Messages</h3>
            <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 100, background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', fontWeight: 600 }}>Live Feed</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,243,239,0.35)' }}>Conversations from WhatsApp, Instagram, Web widget</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chatPreviews.map((chat) => {
            const ChannelIcon = getChannelIcon(chat.channel);
            const isSelected = selectedChat?.id === chat.id;
            return (
              <div key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setLocalMessages([{ role: 'user', content: chat.lastMessage, timestamp: chat.timestamp }]);
                  setExtractedData(null);
                }}
                style={{
                  padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: isSelected ? 'rgba(139,92,246,0.08)' : 'transparent',
                  borderLeft: isSelected ? '3px solid #8b5cf6' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={chat.avatar} alt={chat.customer} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2, width: 14, height: 14,
                      borderRadius: '50%', background: getChannelColor(chat.channel),
                      border: '2px solid #0e0e1c', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <ChannelIcon size={8} color="#fff" />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f5f3ef' }}>{chat.customer}</span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.25)' }}>{formatTime(chat.timestamp)}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Column: Chat Dialog */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(10,10,24,0.2)',
        borderRight: '1px solid rgba(255,255,255,0.06)'
      }}>
        {!selectedChat ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '2rem' }}>
            <Bot size={40} color="rgba(245,243,239,0.15)" />
            <span style={{ color: 'rgba(245,243,239,0.25)', fontSize: '0.85rem' }}>Select a conversation to begin</span>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat header with Autopilot Toggle */}
            <div style={{
              padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={selectedChat.avatar} alt={selectedChat.customer} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f5f3ef' }}>{selectedChat.customer}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)' }}>Source: {selectedChat.channel} chat</div>
                </div>
              </div>
              
              {/* Autopilot toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: autopilot ? '#a8ff3e' : 'rgba(245,243,239,0.4)' }}>
                  {autopilot ? 'AI Autopilot: ON' : 'Manual Mode: ACTIVE'}
                </span>
                <button
                  onClick={() => setAutopilot(!autopilot)}
                  style={{ all: 'unset', cursor: 'pointer', display: 'flex', color: autopilot ? '#a8ff3e' : 'rgba(245,243,239,0.3)' }}
                >
                  {autopilot ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>
            </div>

            {/* Chat Logs */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {localMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '75%', padding: '9px 13px', borderRadius: 14, fontSize: '0.82rem', lineHeight: 1.55,
                    background: msg.role === 'assistant'
                      ? msg.isOwner
                        ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' // Owner is blue
                        : 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))' // AI is purple
                      : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'assistant'
                      ? msg.isOwner ? 'none' : '1px solid rgba(139,92,246,0.18)'
                      : '1px solid rgba(255,255,255,0.05)',
                    color: '#f5f3ef',
                  }}>
                    <div style={{ fontSize: '0.62rem', color: msg.role === 'assistant' ? msg.isOwner ? '#93c5fd' : '#c4b5fd' : 'rgba(245,243,239,0.4)', marginBottom: 3, fontWeight: 600 }}>
                      {msg.role === 'assistant' ? msg.isOwner ? 'Owner Response' : 'AI Assistant Autopilot' : 'Customer'}
                    </div>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Streaming */}
              {streamingText && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    maxWidth: '75%', padding: '9px 13px', borderRadius: 14, fontSize: '0.82rem', lineHeight: 1.55,
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))',
                    border: '1px solid rgba(139,92,246,0.18)', color: '#f5f3ef',
                  }}>
                    <div style={{ fontSize: '0.62rem', color: '#c4b5fd', marginBottom: 3, fontWeight: 600 }}>AI Assistant Autopilot</div>
                    {streamingText}
                    <span style={{ display: 'inline-block', width: 4, height: 12, background: '#a78bfa', marginLeft: 2, animation: 'blink 0.8s infinite' }} />
                  </div>
                </div>
              )}

              {/* Typing loader */}
              {isTyping && !streamingText && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ padding: '10px 16px', borderRadius: 12, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)', display: 'flex', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out infinite' }} />
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.2s infinite' }} />
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.4s ease-in-out 0.4s infinite' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Inbound Simulator Panel */}
            <div style={{
              padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(168,255,62,0.04)', display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span style={{ fontSize: '0.7rem', color: '#a8ff3e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <Sparkles size={12} /> Inbound Simulator:
              </span>
              <input
                type="text"
                placeholder="Simulate customer message (e.g. 'Can I book a facial tomorrow?')"
                value={simulateInput}
                onChange={e => setSimulateInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSimulateInbound(); }}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 6, padding: '5px 10px', fontSize: '0.75rem', color: '#f5f3ef', outline: 'none'
                }}
              />
              <button
                onClick={handleSimulateInbound}
                disabled={!simulateInput.trim()}
                style={{
                  padding: '5px 12px', fontSize: '0.72rem', borderRadius: 6,
                  background: '#a8ff3e', color: '#060610', fontWeight: 600, border: 'none',
                  cursor: simulateInput.trim() ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s'
                }}
              >
                Simulate Receive
              </button>
            </div>

            {/* Owner Reply Input */}
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(6,6,16,0.3)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder={autopilot ? "Toggle off Autopilot above to type manual replies" : "Type manual reply as Owner..."}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSendMessageAsOwner(); }}
                  disabled={autopilot}
                  style={{
                    flex: 1, background: autopilot ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
                    padding: '8px 14px', fontSize: '0.82rem', color: '#f5f3ef',
                    outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={handleSendMessageAsOwner}
                  disabled={autopilot || !inputText.trim()}
                  style={{
                    padding: '0 16px', borderRadius: 10, border: 'none',
                    background: !autopilot && inputText.trim() ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: !autopilot && inputText.trim() ? 'pointer' : 'not-allowed', fontWeight: 600, fontSize: '0.8rem',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Right Column: Extracted Data / Insights */}
      <div style={{
        width: '28%', display: 'flex', flexDirection: 'column', background: 'rgba(6,6,16,0.25)'
      }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f5f3ef', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Brain size={15} color="#a78bfa" /> Lead Insights
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'rgba(245,243,239,0.35)', marginTop: 4 }}>Structured data extracted by AI</p>
        </div>

        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {selectedChat ? (
            <>
              {/* Connection profile card */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(245,243,239,0.3)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Channel Info</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {React.createElement(getChannelIcon(selectedChat.channel), { size: 14, color: getChannelColor(selectedChat.channel) })}
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#f5f3ef', textTransform: 'capitalize' }}>{selectedChat.channel}</span>
                </div>
                {selectedChat.channel === 'whatsapp' && (
                  <div style={{ fontSize: '0.76rem', color: 'rgba(245,243,239,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>Phone: {selectedChat.phone}</span>
                    <a href={`https://wa.me/${selectedChat.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#8b5cf6', display: 'flex' }}><ExternalLink size={10} /></a>
                  </div>
                )}
                {selectedChat.channel === 'instagram' && (
                  <div style={{ fontSize: '0.76rem', color: 'rgba(245,243,239,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>Username: @emma_r</span>
                    <a href={`https://ig.me/m/emma_r`} target="_blank" rel="noreferrer" style={{ color: '#8b5cf6', display: 'flex' }}><ExternalLink size={10} /></a>
                  </div>
                )}
              </div>

              {/* Data Extraction Action */}
              <button
                onClick={handleExtractData}
                disabled={isExtracting || localMessages.length === 0}
                style={{
                  width: '100%', padding: '9px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)',
                  background: isExtracting ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.08)',
                  color: '#c4b5fd', fontSize: '0.78rem', fontWeight: 600, cursor: isExtracting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isExtracting) e.currentTarget.style.background = 'rgba(139,92,246,0.15)'; }}
                onMouseLeave={e => { if (!isExtracting) e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
              >
                {isExtracting ? (
                  <>
                    <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    Extract Customer Data
                  </>
                )}
              </button>

              {/* Data Extraction Fields */}
              {extractedData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'msgFadeIn 0.3s ease-out' }}>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>Extracted Name</div>
                    <div style={{ fontSize: '0.8rem', color: '#f5f3ef', marginTop: 2, fontWeight: 500 }}>{extractedData.name}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>Contact details</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.6)', marginTop: 2 }}>Email: {extractedData.email}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.6)', marginTop: 2 }}>Phone: {extractedData.phone}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>Sentiment</div>
                    <span style={{
                      display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: 100, marginTop: 4,
                      background: extractedData.sentiment?.toLowerCase()?.includes('pos') ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                      color: extractedData.sentiment?.toLowerCase()?.includes('pos') ? '#4ade80' : 'rgba(245,243,239,0.6)',
                    }}>
                      {extractedData.sentiment}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>Product Interests</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.6)', marginTop: 2, lineHeight: 1.4 }}>{extractedData.interest}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>Request/Booking details</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,243,239,0.6)', marginTop: 2, lineHeight: 1.4 }}>{extractedData.request}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,243,239,0.3)', fontWeight: 600, textTransform: 'uppercase' }}>AI Summary</div>
                    <div style={{ fontSize: '0.76rem', color: 'rgba(245,243,239,0.4)', marginTop: 2, lineHeight: 1.4, fontStyle: 'italic' }}>{extractedData.summary}</div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '2rem 1rem', textAlign: 'center', color: 'rgba(245,243,239,0.2)',
                  fontSize: '0.75rem', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: 12
                }}>
                  Click extract to capture leads, requests, sentiment & summaries using Mistral.
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(245,243,239,0.2)', fontSize: '0.75rem' }}>
              Select a chat to view insights
            </div>
          )}
        </div>
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
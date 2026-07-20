import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AgentContext = createContext(null);

const STORAGE_KEY = 'rocketnew_agent_config';
const CONVERSATIONS_KEY = 'rocketnew_conversations';

const DEFAULT_CONFIG = {
  isSetup: false,
  template: null,
  personality: 'professional',
  businessName: '',
  businessEmail: '',
  contactPhone: '',
  websiteUrl: '',
  channels: ['website'],
  whatsappNumber: '',
  instagramHandle: '',
};

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable
  }
}

export function AgentProvider({ children }) {
  const [config, setConfigState] = useState(() => loadFromStorage(STORAGE_KEY, DEFAULT_CONFIG));
  const [conversations, setConversationsState] = useState(() => loadFromStorage(CONVERSATIONS_KEY, []));
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Persist config changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, config);
  }, [config]);

  // Persist conversations
  useEffect(() => {
    saveToStorage(CONVERSATIONS_KEY, conversations);
  }, [conversations]);

  const setConfig = useCallback((updates) => {
    setConfigState(prev => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      return next;
    });
  }, []);

  const completeSetup = useCallback((wizardData) => {
    setConfigState({
      ...DEFAULT_CONFIG,
      ...wizardData,
      isSetup: true,
    });
  }, []);

  const resetAgent = useCallback(() => {
    setConfigState(DEFAULT_CONFIG);
    setConversationsState([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONVERSATIONS_KEY);
  }, []);

  const addConversation = useCallback((message) => {
    setConversationsState(prev => {
      const updated = [...prev, { ...message, timestamp: Date.now() }];
      // Keep last 200 messages
      return updated.slice(-200);
    });
  }, []);

  const clearConversations = useCallback(() => {
    setConversationsState([]);
  }, []);

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);
  const toggleChat = useCallback(() => setIsChatOpen(prev => !prev), []);

  // Derive stats
  const stats = {
    totalConversations: conversations.filter(m => m.role === 'user').length,
    totalResponses: conversations.filter(m => m.role === 'assistant').length,
    lastActive: conversations.length > 0 ? conversations[conversations.length - 1].timestamp : null,
  };

  const value = {
    config,
    setConfig,
    completeSetup,
    resetAgent,
    conversations,
    addConversation,
    clearConversations,
    stats,
    isChatOpen,
    openChat,
    closeChat,
    toggleChat,
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgent must be used within AgentProvider');
  return ctx;
}

export default AgentContext;

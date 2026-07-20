const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

const TEMPLATE_PROMPTS = {
  beauty: `You are an AI receptionist for a beauty salon & spa business. You specialize in:
- Booking appointments (haircuts, coloring, nails, facials, massages, etc.)
- Explaining services and pricing
- Managing staff availability and scheduling
- Answering questions about beauty treatments, aftercare, and products
- Suggesting services based on customer needs
Always be knowledgeable about beauty industry trends and treatments.`,

  delivery: `You are an AI assistant for a delivery & logistics business. You specialize in:
- Tracking orders and providing delivery status updates
- Estimating delivery times (ETAs)
- Handling delivery issues and complaints
- Coordinating pickup and drop-off schedules
- Providing shipping rates and options
Always be precise with timelines and proactive about status updates.`,

  repair: `You are an AI assistant for a repair services business. You specialize in:
- Generating repair quotes and estimates
- Booking diagnostic appointments
- Explaining warranty terms and coverage
- Tracking repair status and timelines
- Recommending maintenance schedules
Always be technically knowledgeable and transparent about costs.`,

  general: `You are an AI assistant for a general business. You specialize in:
- Capturing leads and contact information
- Answering frequently asked questions
- Guiding customers through services and offerings
- Scheduling meetings and consultations
- Providing custom workflow assistance
Always be adaptable and solution-oriented.`,
};

const PERSONALITY_PROMPTS = {
  professional: `Your communication style is PROFESSIONAL:
- Use formal, concise language
- Be business-focused and efficient
- Maintain a polished, corporate tone
- Provide structured, organized responses
- Use proper titles and courteous language`,

  friendly: `Your communication style is FRIENDLY:
- Be warm, conversational, and approachable
- Use casual but respectful language
- Add occasional emoji to feel personable 😊
- Show genuine enthusiasm and empathy
- Make the customer feel welcome and valued`,

  expert: `Your communication style is EXPERT:
- Be knowledgeable, detailed, and authoritative
- Provide in-depth explanations when needed
- Reference industry best practices
- Offer data-driven recommendations
- Position yourself as a trusted advisor`,

  casual: `Your communication style is CASUAL:
- Be relaxed, relatable, and easy-going
- Use informal, conversational language
- Keep responses short and punchy
- Add humor where appropriate
- Make interactions feel like chatting with a friend`,
};

function buildSystemPrompt(agentConfig) {
  const {
    template = 'general',
    personality = 'professional',
    businessName = 'our business',
    businessEmail = '',
    contactPhone = '',
    websiteUrl = '',
    channels = [],
  } = agentConfig || {};

  const templatePrompt = TEMPLATE_PROMPTS[template] || TEMPLATE_PROMPTS.general;
  const personalityPrompt = PERSONALITY_PROMPTS[personality] || PERSONALITY_PROMPTS.professional;

  let contactInfo = '';
  if (businessEmail) contactInfo += `\n- Email: ${businessEmail}`;
  if (contactPhone) contactInfo += `\n- Phone: ${contactPhone}`;
  if (websiteUrl) contactInfo += `\n- Website: ${websiteUrl}`;

  return `You are the AI agent for "${businessName}". You are powered by Rocket.new platform.

${templatePrompt}

${personalityPrompt}

Business Information:
- Business Name: ${businessName}${contactInfo}
- Active Channels: ${channels.length > 0 ? channels.join(', ') : 'Website Chat'}

Important Rules:
1. Always stay in character as the business's AI assistant
2. Never reveal you are Mistral AI or any specific AI model — you are "${businessName}'s" assistant
3. If you don't know specific business details (like exact prices), say you'll check and get back to them
4. Keep responses concise — aim for 1-3 short paragraphs max
5. Always try to guide the conversation toward a booking, sale, or resolution
6. Greet first-time users warmly and introduce yourself`;
}

/**
 * Send a chat message to Mistral AI (non-streaming)
 */
export async function chatWithAgent(messages, agentConfig) {
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your-mistral-api-key-here') {
    throw new Error('Mistral API key not configured. Please add VITE_MISTRAL_API_KEY to your .env file.');
  }

  const systemPrompt = buildSystemPrompt(agentConfig);
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: apiMessages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'I apologize, I couldn\'t generate a response. Please try again.';
}

/**
 * Stream a chat response from Mistral AI
 */
export async function streamChatWithAgent(messages, agentConfig, onChunk) {
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your-mistral-api-key-here') {
    throw new Error('Mistral API key not configured.');
  }

  const systemPrompt = buildSystemPrompt(agentConfig);
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: apiMessages,
      max_tokens: 512,
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Mistral API error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullContent = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') break;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          fullContent += delta;
          onChunk(fullContent, delta);
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  return fullContent || 'I apologize, I couldn\'t generate a response. Please try again.';
}

export { buildSystemPrompt };

import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalitySelector = ({ selectedPersonality, onPersonalityChange, previewData }) => {
  const personalityOptions = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal, courteous, and business-focused communication',
      icon: 'Briefcase',
      color: 'bg-primary/10 text-primary',
      examples: {
        greeting: "Good day! I\'m here to assist you with your business needs. How may I help you today?",
        booking: "I\'d be happy to schedule an appointment for you. What date and time would work best?",
        pricing: "Our pricing structure is transparent and competitive. Let me provide you with detailed information."
      }
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Warm, approachable, and conversational tone',
      icon: 'Heart',
      color: 'bg-secondary/10 text-secondary',
      examples: {
        greeting: "Hi there! 😊 I'm excited to help you today. What can I do for you?",
        booking: "I\'d love to get you scheduled! What day works best for you?",
        pricing: "Great question! Let me break down our pricing in a way that makes sense."
      }
    },
    {
      id: 'casual',
      name: 'Casual',
      description: 'Relaxed, informal, and easy-going communication',
      icon: 'Coffee',
      color: 'bg-accent/10 text-accent',
      examples: {
        greeting: "Hey! What\'s up? I\'m here to help with whatever you need.",
        booking: "Sure thing! When do you want to come in? I'll check what's available.",
        pricing: "No worries! Here\'s the deal on pricing - it\'s pretty straightforward."
      }
    }
  ];

  const currentPersonality = personalityOptions?.find(p => p?.id === selectedPersonality);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Choose Your Agent's Personality</h3>
        <p className="text-muted-foreground">
          This determines how your AI assistant communicates with customers
        </p>
      </div>
      {/* Personality Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personalityOptions?.map((personality) => (
          <div
            key={personality?.id}
            onClick={() => onPersonalityChange(personality?.id)}
            className={`
              relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-elevation-2
              ${selectedPersonality === personality?.id
                ? 'border-secondary bg-secondary/5 shadow-elevation-1'
                : 'border-border bg-card hover:border-secondary/50'
              }
            `}
          >
            <div className="text-center space-y-4">
              <div className={`
                w-16 h-16 mx-auto rounded-full flex items-center justify-center
                ${selectedPersonality === personality?.id ? personality?.color : 'bg-muted text-muted-foreground'}
              `}>
                <Icon name={personality?.icon} size={28} />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {personality?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {personality?.description}
                </p>
              </div>
            </div>
            
            {selectedPersonality === personality?.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} className="text-secondary-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Live Preview */}
      {currentPersonality && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPersonality?.color}`}>
              <Icon name={currentPersonality?.icon} size={16} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Live Preview</h4>
              <p className="text-sm text-muted-foreground">
                See how your agent will communicate
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Greeting Example */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Initial Greeting
              </p>
              <div className="bg-secondary/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Bot" size={16} className="text-secondary-foreground" />
                  </div>
                  <p className="text-sm text-foreground">
                    {currentPersonality?.examples?.greeting}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Example */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Booking Response
              </p>
              <div className="space-y-2">
                <div className="bg-muted/50 rounded-lg p-3 ml-8">
                  <p className="text-sm text-muted-foreground">
                    Customer: "I'd like to book an appointment"
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={16} className="text-secondary-foreground" />
                    </div>
                    <p className="text-sm text-foreground">
                      {currentPersonality?.examples?.booking}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Example */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pricing Inquiry
              </p>
              <div className="space-y-2">
                <div className="bg-muted/50 rounded-lg p-3 ml-8">
                  <p className="text-sm text-muted-foreground">
                    Customer: "How much do your services cost?"
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={16} className="text-secondary-foreground" />
                    </div>
                    <p className="text-sm text-foreground">
                      {currentPersonality?.examples?.pricing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalitySelector;
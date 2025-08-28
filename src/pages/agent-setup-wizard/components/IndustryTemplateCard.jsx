import React from 'react';
import Icon from '../../../components/AppIcon';

const IndustryTemplateCard = ({ template, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(template?.id)}
      className={`
        relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-elevation-2
        ${isSelected 
          ? 'border-secondary bg-secondary/5 shadow-elevation-1' 
          : 'border-border bg-card hover:border-secondary/50'
        }
      `}
    >
      <div className="flex items-start space-x-4">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
          ${isSelected 
            ? 'bg-secondary text-secondary-foreground' 
            : 'bg-muted text-muted-foreground'
          }
        `}>
          <Icon name={template?.icon} size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {template?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {template?.description}
          </p>
          
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground uppercase tracking-wide">
              Sample Conversation:
            </p>
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Customer: {template?.sampleConversation?.customer}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <p className="text-xs text-foreground">
                  Agent: {template?.sampleConversation?.agent}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {template?.features?.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} className="text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryTemplateCard;
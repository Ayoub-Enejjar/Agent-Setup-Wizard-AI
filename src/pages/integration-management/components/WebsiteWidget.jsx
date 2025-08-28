import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WebsiteWidget = ({ isOpen, onClose, onSave }) => {
  const [widgetConfig, setWidgetConfig] = useState({
    position: 'bottom-right',
    primaryColor: '#00D1FF',
    welcomeMessage: 'Hi! How can I help you today?',
    placeholder: 'Type your message...',
    showAvatar: true,
    showBranding: true
  });

  const [embedCode, setEmbedCode] = useState('');

  const positionOptions = [
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'top-left', label: 'Top Left' }
  ];

  const generateEmbedCode = () => {
    const code = `<!-- Rocket.new Chat Widget -->
<script>
  window.RocketChatConfig = {
    position: "${widgetConfig?.position}",
    primaryColor: "${widgetConfig?.primaryColor}",
    welcomeMessage: "${widgetConfig?.welcomeMessage}",
    placeholder: "${widgetConfig?.placeholder}",
    showAvatar: ${widgetConfig?.showAvatar},
    showBranding: ${widgetConfig?.showBranding}
  };
</script>
<script src="https://widget.rocket.new/embed.js" async></script>
<!-- End Rocket.new Chat Widget -->`;
    setEmbedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(embedCode);
  };

  const handleConfigChange = (field, value) => {
    setWidgetConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(widgetConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Website Chat Widget</h2>
              <p className="text-sm text-muted-foreground">Customize and embed your chat widget</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Widget Configuration</h3>
              <div className="space-y-4">
                <Select
                  label="Position"
                  options={positionOptions}
                  value={widgetConfig?.position}
                  onChange={(value) => handleConfigChange('position', value)}
                />

                <Input
                  label="Primary Color"
                  type="color"
                  value={widgetConfig?.primaryColor}
                  onChange={(e) => handleConfigChange('primaryColor', e?.target?.value)}
                />

                <Input
                  label="Welcome Message"
                  type="text"
                  placeholder="Enter welcome message"
                  value={widgetConfig?.welcomeMessage}
                  onChange={(e) => handleConfigChange('welcomeMessage', e?.target?.value)}
                />

                <Input
                  label="Input Placeholder"
                  type="text"
                  placeholder="Enter placeholder text"
                  value={widgetConfig?.placeholder}
                  onChange={(e) => handleConfigChange('placeholder', e?.target?.value)}
                />

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={widgetConfig?.showAvatar}
                      onChange={(e) => handleConfigChange('showAvatar', e?.target?.checked)}
                      className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
                    />
                    <span className="text-sm font-medium text-foreground">Show Avatar</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={widgetConfig?.showBranding}
                      onChange={(e) => handleConfigChange('showBranding', e?.target?.checked)}
                      className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
                    />
                    <span className="text-sm font-medium text-foreground">Show Rocket.new Branding</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Embed Code */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-foreground">Embed Code</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateEmbedCode}
                  iconName="Code"
                  iconPosition="left"
                >
                  Generate Code
                </Button>
              </div>

              {embedCode && (
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-4 relative">
                    <pre className="text-xs text-foreground overflow-x-auto whitespace-pre-wrap">
                      {embedCode}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2"
                      iconName="Copy"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Copy and paste this code before the closing &lt;/body&gt; tag on your website
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Live Preview</h3>
            <div className="bg-muted rounded-lg p-6 min-h-[400px] relative">
              <div className="text-center text-muted-foreground mb-8">
                <Icon name="Monitor" size={48} className="mx-auto mb-2" />
                <p className="text-sm">Website Preview</p>
              </div>

              {/* Mock Chat Widget */}
              <div className={`absolute ${
                widgetConfig?.position?.includes('bottom') ? 'bottom-4' : 'top-4'
              } ${
                widgetConfig?.position?.includes('right') ? 'right-4' : 'left-4'
              }`}>
                <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-80">
                  {/* Widget Header */}
                  <div 
                    className="p-4 rounded-t-lg text-white"
                    style={{ backgroundColor: widgetConfig?.primaryColor }}
                  >
                    <div className="flex items-center space-x-3">
                      {widgetConfig?.showAvatar && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Icon name="Bot" size={16} className="text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">AI Assistant</p>
                        <p className="text-xs opacity-90">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" size={12} className="text-muted-foreground" />
                      </div>
                      <div 
                        className="px-3 py-2 rounded-lg text-sm text-white max-w-[200px]"
                        style={{ backgroundColor: widgetConfig?.primaryColor }}
                      >
                        {widgetConfig?.welcomeMessage}
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={widgetConfig?.placeholder}
                        className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
                        disabled
                      />
                      <button 
                        className="p-2 rounded-lg text-white"
                        style={{ backgroundColor: widgetConfig?.primaryColor }}
                        disabled
                      >
                        <Icon name="Send" size={16} />
                      </button>
                    </div>
                    {widgetConfig?.showBranding && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Powered by Rocket.new
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Widget
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteWidget;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WebhookManager = ({ isOpen, onClose, onSave }) => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Message Received',
      url: 'https://api.yourdomain.com/webhooks/message',
      events: ['message.received', 'message.delivered'],
      status: 'active',
      lastTriggered: '2025-01-22T10:30:00Z'
    },
    {
      id: 2,
      name: 'Booking Created',
      url: 'https://api.yourdomain.com/webhooks/booking',
      events: ['booking.created', 'booking.updated'],
      status: 'inactive',
      lastTriggered: null
    }
  ]);

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [],
    status: 'active'
  });

  const [isAddingWebhook, setIsAddingWebhook] = useState(false);

  const eventOptions = [
    { value: 'message.received', label: 'Message Received' },
    { value: 'message.delivered', label: 'Message Delivered' },
    { value: 'message.failed', label: 'Message Failed' },
    { value: 'booking.created', label: 'Booking Created' },
    { value: 'booking.updated', label: 'Booking Updated' },
    { value: 'booking.cancelled', label: 'Booking Cancelled' },
    { value: 'payment.completed', label: 'Payment Completed' },
    { value: 'payment.failed', label: 'Payment Failed' }
  ];

  const addWebhook = () => {
    if (!newWebhook?.name || !newWebhook?.url || newWebhook?.events?.length === 0) return;

    const webhook = {
      id: Date.now(),
      ...newWebhook,
      lastTriggered: null
    };

    setWebhooks(prev => [...prev, webhook]);
    setNewWebhook({ name: '', url: '', events: [], status: 'active' });
    setIsAddingWebhook(false);
  };

  const deleteWebhook = (id) => {
    setWebhooks(prev => prev?.filter(w => w?.id !== id));
  };

  const toggleWebhookStatus = (id) => {
    setWebhooks(prev => prev?.map(w => 
      w?.id === id ? { ...w, status: w?.status === 'active' ? 'inactive' : 'active' } : w
    ));
  };

  const testWebhook = async (webhook) => {
    // Simulate webhook test
    console.log('Testing webhook:', webhook?.name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Webhook" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Webhook Management</h2>
              <p className="text-sm text-muted-foreground">Configure webhook endpoints for real-time notifications</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Webhook */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Add New Webhook</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingWebhook(!isAddingWebhook)}
                iconName={isAddingWebhook ? "ChevronUp" : "Plus"}
                iconPosition="left"
              >
                {isAddingWebhook ? 'Cancel' : 'Add Webhook'}
              </Button>
            </div>

            {isAddingWebhook && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Webhook Name"
                  type="text"
                  placeholder="Enter webhook name"
                  value={newWebhook?.name}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e?.target?.value }))}
                />

                <Input
                  label="Endpoint URL"
                  type="url"
                  placeholder="https://api.yourdomain.com/webhook"
                  value={newWebhook?.url}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e?.target?.value }))}
                />

                <div className="md:col-span-2">
                  <Select
                    label="Events"
                    options={eventOptions}
                    value={newWebhook?.events}
                    onChange={(value) => setNewWebhook(prev => ({ ...prev, events: value }))}
                    multiple
                    searchable
                    placeholder="Select events to listen for"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button
                    variant="default"
                    onClick={addWebhook}
                    disabled={!newWebhook?.name || !newWebhook?.url || newWebhook?.events?.length === 0}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Webhook
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Existing Webhooks */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Configured Webhooks</h3>
            <div className="space-y-4">
              {webhooks?.map((webhook) => (
                <div key={webhook?.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-foreground">{webhook?.name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          webhook?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                        }`}>
                          {webhook?.status}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">{webhook?.url}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testWebhook(webhook)}
                        iconName="TestTube"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWebhookStatus(webhook?.id)}
                        iconName={webhook?.status === 'active' ? "Pause" : "Play"}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWebhook(webhook?.id)}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {webhook?.events?.map((event) => (
                      <span
                        key={event}
                        className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                      >
                        {event}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Last triggered: {
                        webhook?.lastTriggered 
                          ? new Date(webhook.lastTriggered)?.toLocaleString()
                          : 'Never'
                      }
                    </span>
                    <div className="flex items-center space-x-4">
                      <span>Success rate: 98.5%</span>
                      <span>Avg response: 245ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook Documentation */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-secondary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Webhook Documentation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Webhooks are sent as POST requests with JSON payload</li>
                  <li>• Include a signature header for security verification</li>
                  <li>• Endpoint should respond with 200 status code</li>
                  <li>• Failed webhooks are retried up to 3 times with exponential backoff</li>
                </ul>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 p-0 h-auto text-secondary"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  View full documentation
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" onClick={() => onSave(webhooks)}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebhookManager;
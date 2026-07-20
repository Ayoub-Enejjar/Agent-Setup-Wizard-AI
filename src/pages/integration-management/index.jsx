import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IntegrationCard from './components/IntegrationCard';
import WhatsAppSetup from './components/WhatsAppSetup';
import WebsiteWidget from './components/WebsiteWidget';
import ConnectionHealth from './components/ConnectionHealth';
import TestingInterface from './components/TestingInterface';
import WebhookManager from './components/WebhookManager';
import { useAgent } from '../../context/agentContext';

const IntegrationManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [integrations, setIntegrations] = useState([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Connect your WhatsApp Business account for automated messaging',
      icon: 'MessageCircle',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'connected',
      lastConnected: '2025-01-22 10:30 AM',
      messagesCount: 247,
      errorMessage: null
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      description: 'Automate Instagram direct message responses',
      icon: 'Instagram',
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      status: 'disconnected',
      lastConnected: null,
      messagesCount: 0,
      errorMessage: null
    },
    {
      id: 'website-widget',
      name: 'Website Chat Widget',
      description: 'Embed AI chat widget on your website',
      icon: 'Globe',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      status: 'connected',
      lastConnected: '2025-01-22 09:15 AM',
      messagesCount: 89,
      errorMessage: null
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      description: 'Process payments and capture deposits',
      icon: 'CreditCard',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'connected',
      lastConnected: '2025-01-21 04:20 PM',
      messagesCount: 0,
      errorMessage: null
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync appointments and availability',
      icon: 'Calendar',
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      status: 'error',
      lastConnected: '2025-01-20 02:45 PM',
      messagesCount: 0,
      errorMessage: 'Authentication expired. Please reconnect.'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps via Zapier',
      icon: 'Zap',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      status: 'disconnected',
      lastConnected: null,
      messagesCount: 0,
      errorMessage: null
    }
  ]);

  const [healthData, setHealthData] = useState({
    deliveryRate: 97.5,
    messagesDelivered: 2847,
    totalMessages: 2920,
    avgResponseTime: 185,
    errorRate: 2.1,
    errorCount: 61,
    recentActivity: [
      {
        type: 'success',
        message: 'WhatsApp message delivered successfully',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        type: 'success',
        message: 'Website widget connection established',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        type: 'warning',
        message: 'Instagram API rate limit approaching',
        timestamp: new Date(Date.now() - 900000)
      },
      {
        type: 'error',
        message: 'Google Calendar authentication failed',
        timestamp: new Date(Date.now() - 1200000)
      },
      {
        type: 'success',
        message: 'Stripe payment webhook received',
        timestamp: new Date(Date.now() - 1500000)
      }
    ]
  });

  const handleConnect = (integrationId) => {
    if (integrationId === 'whatsapp') {
      setActiveModal('whatsapp-setup');
    } else if (integrationId === 'website-widget') {
      setActiveModal('website-widget');
    } else if (integrationId === 'instagram') {
      // Prompt for Instagram handle and create real DM link
      const handle = prompt('Enter your Instagram username (without @):');
      if (handle) {
        setIntegrations(prev => prev?.map(integration =>
          integration?.id === 'instagram'
            ? { ...integration, status: 'connected', lastConnected: new Date()?.toLocaleString(), instagramHandle: handle }
            : integration
        ));
        // Open the real Instagram DM link
        window.open(`https://ig.me/m/${handle.trim()}`, '_blank');
      }
    } else {
      // Simulate connection for other integrations
      setIntegrations(prev => prev?.map(integration =>
        integration?.id === integrationId
          ? { ...integration, status: 'connected', lastConnected: new Date()?.toLocaleString() }
          : integration
      ));
    }
  };

  const handleDisconnect = (integrationId) => {
    setIntegrations(prev => prev?.map(integration =>
      integration?.id === integrationId
        ? { ...integration, status: 'disconnected', lastConnected: null }
        : integration
    ));
  };

  const handleConfigure = (integrationId) => {
    if (integrationId === 'whatsapp') {
      setActiveModal('whatsapp-setup');
    } else if (integrationId === 'website-widget') {
      setActiveModal('website-widget');
    } else {
      console.log('Configure integration:', integrationId);
    }
  };

  const handleTest = (integrationId, testResult = null) => {
    if (testResult) {
      console.log('Test completed for:', integrationId, testResult);
    } else {
      console.log('Testing integration:', integrationId);
    }
  };

  const handleSaveWhatsApp = (config) => {
    setIntegrations(prev => prev?.map(integration =>
      integration?.id === 'whatsapp'
        ? { ...integration, status: 'connected', lastConnected: new Date()?.toLocaleString() }
        : integration
    ));
  };

  const handleSaveWidget = (config) => {
    setIntegrations(prev => prev?.map(integration =>
      integration?.id === 'website-widget'
        ? { ...integration, status: 'connected', lastConnected: new Date()?.toLocaleString() }
        : integration
    ));
  };

  const handleSaveWebhooks = (webhooks) => {
    console.log('Webhooks saved:', webhooks);
  };

  const connectedIntegrations = integrations?.filter(i => i?.status === 'connected')?.length;
  const totalIntegrations = integrations?.length;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="transition-all duration-300 lg:ml-16">
        <Header />
        
        <main className="p-6 pb-20 lg:pb-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Integration Management</h1>
                <p className="text-muted-foreground mt-2">
                  Connect and manage your third-party integrations and communication channels
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-card border border-border rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">
                      {connectedIntegrations}/{totalIntegrations} Connected
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveModal('webhook-manager')}
                  iconName="Webhook"
                  iconPosition="left"
                >
                  Manage Webhooks
                </Button>
              </div>
            </div>
          </div>

          {/* Connection Health Dashboard */}
          <div className="mb-8">
            <ConnectionHealth healthData={healthData} />
          </div>

          {/* Integration Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Available Integrations</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh Status
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {integrations?.map((integration) => (
                <IntegrationCard
                  key={integration?.id}
                  integration={integration}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  onConfigure={handleConfigure}
                  onTest={handleTest}
                />
              ))}
            </div>
          </div>

          {/* Testing Interface */}
          <div className="mb-8">
            <TestingInterface 
              integrations={integrations}
              onTest={handleTest}
            />
          </div>

          {/* Quick Setup Guide */}
          <div className="bg-gradient-secondary rounded-lg p-6 text-secondary-foreground">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Rocket" size={24} className="text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Quick Setup Guide</h3>
                <p className="text-secondary-foreground/80 mb-4">
                  Get started with your integrations in just a few steps. Connect your most important channels first.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span>Connect WhatsApp Business</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <span>Setup Website Widget</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <span>Configure Webhooks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Modals */}
      <WhatsAppSetup
        isOpen={activeModal === 'whatsapp-setup'}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveWhatsApp}
      />
      <WebsiteWidget
        isOpen={activeModal === 'website-widget'}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveWidget}
      />
      <WebhookManager
        isOpen={activeModal === 'webhook-manager'}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveWebhooks}
      />
    </div>
  );
};

export default IntegrationManagement;
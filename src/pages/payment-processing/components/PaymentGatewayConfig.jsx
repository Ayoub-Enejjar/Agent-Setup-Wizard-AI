import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentGatewayConfig = ({ gateways, onUpdateGateway, onTestGateway }) => {
  const [expandedGateway, setExpandedGateway] = useState(null);
  const [testResults, setTestResults] = useState({});

  const handleToggleGateway = (gatewayId, enabled) => {
    onUpdateGateway(gatewayId, { enabled });
  };

  const handleTestGateway = async (gatewayId) => {
    setTestResults(prev => ({ ...prev, [gatewayId]: 'testing' }));
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setTestResults(prev => ({ 
        ...prev, 
        [gatewayId]: success ? 'success' : 'failed' 
      }));
    }, 2000);
  };

  const getGatewayIcon = (gateway) => {
    const icons = {
      stripe: 'CreditCard',
      paypal: 'Wallet',
      square: 'Building2',
      local_bank: 'Landmark'
    };
    return icons?.[gateway?.id] || 'CreditCard';
  };

  const getTestResultIcon = (result) => {
    if (result === 'testing') return 'Loader2';
    if (result === 'success') return 'CheckCircle';
    if (result === 'failed') return 'XCircle';
    return 'Play';
  };

  const getTestResultColor = (result) => {
    if (result === 'testing') return 'text-muted-foreground';
    if (result === 'success') return 'text-success';
    if (result === 'failed') return 'text-destructive';
    return 'text-secondary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Payment Gateway Configuration</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure and manage your payment processing providers
          </p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Add Gateway
        </Button>
      </div>
      <div className="space-y-4">
        {gateways?.map((gateway) => (
          <div key={gateway?.id} className="border border-border rounded-lg overflow-hidden">
            <div className="p-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${gateway?.enabled ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                    <Icon name={getGatewayIcon(gateway)} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{gateway?.name}</h4>
                    <p className="text-sm text-muted-foreground">{gateway?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium ${gateway?.enabled ? 'text-success' : 'text-muted-foreground'}`}>
                      {gateway?.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedGateway(expandedGateway === gateway?.id ? null : gateway?.id)}
                    iconName={expandedGateway === gateway?.id ? "ChevronUp" : "ChevronDown"}
                  />
                </div>
              </div>
            </div>

            {expandedGateway === gateway?.id && (
              <div className="p-6 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Configuration */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground">Configuration</h5>
                    
                    <Checkbox
                      label="Enable this gateway"
                      checked={gateway?.enabled}
                      onChange={(e) => handleToggleGateway(gateway?.id, e?.target?.checked)}
                    />

                    <Input
                      label="API Key"
                      type="password"
                      value={gateway?.apiKey || ''}
                      placeholder="Enter API key..."
                      onChange={(e) => onUpdateGateway(gateway?.id, { apiKey: e?.target?.value })}
                    />

                    <Input
                      label="Secret Key"
                      type="password"
                      value={gateway?.secretKey || ''}
                      placeholder="Enter secret key..."
                      onChange={(e) => onUpdateGateway(gateway?.id, { secretKey: e?.target?.value })}
                    />

                    <Input
                      label="Webhook URL"
                      type="url"
                      value={gateway?.webhookUrl || ''}
                      placeholder="https://your-domain.com/webhook"
                      onChange={(e) => onUpdateGateway(gateway?.id, { webhookUrl: e?.target?.value })}
                      description="URL to receive payment notifications"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Transaction Fee (%)"
                        type="number"
                        value={gateway?.feePercentage || ''}
                        placeholder="2.9"
                        onChange={(e) => onUpdateGateway(gateway?.id, { feePercentage: e?.target?.value })}
                      />
                      <Input
                        label="Fixed Fee ($)"
                        type="number"
                        value={gateway?.fixedFee || ''}
                        placeholder="0.30"
                        onChange={(e) => onUpdateGateway(gateway?.id, { fixedFee: e?.target?.value })}
                      />
                    </div>
                  </div>

                  {/* Testing & Status */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground">Testing & Validation</h5>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">Connection Test</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestGateway(gateway?.id)}
                          disabled={testResults?.[gateway?.id] === 'testing'}
                          iconName={getTestResultIcon(testResults?.[gateway?.id])}
                          iconPosition="left"
                        >
                          {testResults?.[gateway?.id] === 'testing' ? 'Testing...' : 'Test Connection'}
                        </Button>
                      </div>
                      
                      {testResults?.[gateway?.id] && (
                        <div className={`flex items-center space-x-2 text-sm ${getTestResultColor(testResults?.[gateway?.id])}`}>
                          <Icon name={getTestResultIcon(testResults?.[gateway?.id])} size={16} />
                          <span>
                            {testResults?.[gateway?.id] === 'testing' && 'Testing connection...'}
                            {testResults?.[gateway?.id] === 'success' && 'Connection successful'}
                            {testResults?.[gateway?.id] === 'failed' && 'Connection failed'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h6 className="text-sm font-medium text-foreground">Gateway Statistics</h6>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Success Rate</span>
                          <div className="font-medium text-foreground">{gateway?.successRate}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg. Processing Time</span>
                          <div className="font-medium text-foreground">{gateway?.avgProcessingTime}s</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Monthly Volume</span>
                          <div className="font-medium text-foreground">${gateway?.monthlyVolume?.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Transactions</span>
                          <div className="font-medium text-foreground">{gateway?.totalTransactions?.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h6 className="text-sm font-medium text-foreground">Supported Features</h6>
                      <div className="flex flex-wrap gap-2">
                        {gateway?.features?.map((feature, index) => (
                          <span key={index} className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    View Documentation
                  </Button>
                  <Button variant="outline" size="sm">
                    Reset Configuration
                  </Button>
                  <Button size="sm">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentGatewayConfig;
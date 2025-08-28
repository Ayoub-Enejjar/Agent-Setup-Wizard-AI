import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TestingInterface = ({ integrations, onTest }) => {
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [testType, setTestType] = useState('message');
  const [testMessage, setTestMessage] = useState('Hello! This is a test message from Rocket.new');
  const [testResults, setTestResults] = useState([]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const integrationOptions = integrations?.filter(integration => integration?.status === 'connected')?.map(integration => ({
      value: integration?.id,
      label: integration?.name
    }));

  const testTypeOptions = [
    { value: 'message', label: 'Send Test Message' },
    { value: 'webhook', label: 'Webhook Validation' },
    { value: 'connection', label: 'Connection Test' },
    { value: 'auth', label: 'Authentication Test' }
  ];

  const runTest = async () => {
    if (!selectedIntegration) return;

    setIsRunningTest(true);
    
    // Simulate test execution
    const testResult = {
      id: Date.now(),
      integration: integrations?.find(i => i?.id === selectedIntegration)?.name,
      type: testType,
      timestamp: new Date(),
      status: Math.random() > 0.2 ? 'success' : 'error',
      message: testMessage,
      responseTime: Math.floor(Math.random() * 500) + 100,
      details: testType === 'message' ? 'Message delivered successfully' :
               testType === 'webhook' ? 'Webhook endpoint responding correctly' :
               testType === 'connection'? 'Connection established and stable' : 'Authentication tokens valid'
    };

    setTimeout(() => {
      setTestResults(prev => [testResult, ...prev?.slice(0, 9)]);
      setIsRunningTest(false);
      onTest(selectedIntegration, testResult);
    }, 2000);
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'text-success' : 'text-destructive';
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? 'CheckCircle' : 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="TestTube" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Integration Testing</h3>
            <p className="text-sm text-muted-foreground">Test your integrations in real-time</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Configuration */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Test Configuration</h4>
          
          <Select
            label="Select Integration"
            options={integrationOptions}
            value={selectedIntegration}
            onChange={setSelectedIntegration}
            placeholder="Choose an integration to test"
          />

          <Select
            label="Test Type"
            options={testTypeOptions}
            value={testType}
            onChange={setTestType}
          />

          {testType === 'message' && (
            <Input
              label="Test Message"
              type="text"
              placeholder="Enter test message"
              value={testMessage}
              onChange={(e) => setTestMessage(e?.target?.value)}
            />
          )}

          <Button
            variant="default"
            onClick={runTest}
            disabled={!selectedIntegration || isRunningTest}
            loading={isRunningTest}
            iconName="Play"
            iconPosition="left"
            fullWidth
          >
            {isRunningTest ? 'Running Test...' : 'Run Test'}
          </Button>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border">
            <h5 className="text-sm font-medium text-foreground mb-3">Quick Actions</h5>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Zap"
                iconPosition="left"
                onClick={() => {
                  setTestType('connection');
                  runTest();
                }}
                disabled={!selectedIntegration || isRunningTest}
              >
                Quick Test
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                iconPosition="left"
                onClick={() => {
                  setTestType('auth');
                  runTest();
                }}
                disabled={!selectedIntegration || isRunningTest}
              >
                Auth Check
              </Button>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Test Results</h4>
            {testResults?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTestResults([])}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testResults?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="TestTube" size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No test results yet</p>
                <p className="text-xs">Run a test to see results here</p>
              </div>
            ) : (
              testResults?.map((result) => (
                <div key={result?.id} className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getStatusIcon(result?.status)} 
                        size={16} 
                        className={getStatusColor(result?.status)} 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {result?.integration}
                      </span>
                      <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded">
                        {result?.type}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {result?.timestamp?.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground">{result?.details}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Response Time: {result?.responseTime}ms</span>
                    <span className={`font-medium ${getStatusColor(result?.status)}`}>
                      {result?.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingInterface;
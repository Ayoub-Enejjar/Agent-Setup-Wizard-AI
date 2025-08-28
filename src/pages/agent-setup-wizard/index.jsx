import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StepIndicator from './components/StepIndicator';
import IndustryTemplateCard from './components/IndustryTemplateCard';
import BusinessDetailsForm from './components/BusinessDetailsForm';
import PersonalitySelector from './components/PersonalitySelector';
import IntegrationSetup from './components/IntegrationSetup';
import WizardNavigation from './components/WizardNavigation';
import CompletionScreen from './components/CompletionScreen';

const AgentSetupWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Wizard data state
  const [wizardData, setWizardData] = useState({
    selectedTemplate: null,
    businessDetails: {
      businessName: '',
      contactPhone: '',
      businessEmail: '',
      websiteUrl: '',
      businessAddress: '',
      openingTime: '09:00',
      closingTime: '17:00',
      timezone: 'UTC-5',
      operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      serviceRadius: '25',
      serviceCities: '',
      allowPhoneCalls: true,
      allowTextMessages: true,
      allowEmails: true,
      allowWhatsApp: false
    },
    personality: 'professional',
    integrations: {
      whatsapp: { enabled: false, phone: '', displayName: '' },
      instagram: { enabled: false, username: '' },
      website: { enabled: true, primaryColor: '#00D1FF' }
    }
  });

  const steps = [
    {
      id: 1,
      title: 'Choose Template',
      description: 'Select your industry'
    },
    {
      id: 2,
      title: 'Business Details',
      description: 'Configure your business'
    },
    {
      id: 3,
      title: 'Agent Personality',
      description: 'Set communication style'
    },
    {
      id: 4,
      title: 'Integrations',
      description: 'Connect your channels'
    }
  ];

  // Industry templates mock data
  const industryTemplates = [
    {
      id: 'salon',
      name: 'Beauty & Salon',
      description: 'Perfect for hair salons, spas, nail studios, and beauty services',
      icon: 'Scissors',
      features: ['Appointment booking', 'Service pricing', 'Staff scheduling', 'Beauty tips'],
      sampleConversation: {
        customer: "Hi, I'd like to book a haircut for this weekend",
        agent: "I\'d be happy to help you book a haircut! We have availability this Saturday at 2:00 PM or Sunday at 11:00 AM. Which works better for you?"
      }
    },
    {
      id: 'delivery',
      name: 'Delivery & Logistics',
      description: 'Ideal for delivery services, courier companies, and logistics providers',
      icon: 'Truck',
      features: ['Order tracking', 'Delivery scheduling', 'Route optimization', 'Status updates'],
      sampleConversation: {
        customer: "Where is my package? Order #12345",
        agent: "Let me check that for you! Your package #12345 is currently out for delivery and should arrive between 2-4 PM today. You'll receive a notification when it's delivered."
      }
    },
    {
      id: 'repair',
      name: 'Repair Services',
      description: 'Great for appliance repair, electronics, automotive, and maintenance services',
      icon: 'Wrench',
      features: ['Service quotes', 'Diagnostic booking', 'Parts availability', 'Warranty info'],
      sampleConversation: {
        customer: "My washing machine is making a loud noise. Can you help?",
        agent: "I can definitely help with that! Loud noises usually indicate a drum or bearing issue. I can schedule a diagnostic visit for tomorrow morning. Would 10:00 AM work for you?"
      }
    },
    {
      id: 'general',
      name: 'General Business',
      description: 'Flexible template suitable for any business type with customizable workflows',
      icon: 'Building',
      features: ['Lead capture', 'FAQ responses', 'Contact forms', 'Custom workflows'],
      sampleConversation: {
        customer: "I\'m interested in your services. Can you tell me more?",
        agent: "I\'d be happy to help! We offer comprehensive business solutions tailored to your needs. Could you tell me a bit about what you\'re looking for so I can provide the most relevant information?"
      }
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('wizardProgress', JSON.stringify({
        currentStep,
        wizardData,
        timestamp: new Date()?.toISOString()
      }));
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentStep, wizardData]);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('wizardProgress');
    if (savedProgress) {
      try {
        const { currentStep: savedStep, wizardData: savedData } = JSON.parse(savedProgress);
        setCurrentStep(savedStep);
        setWizardData(savedData);
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  const handleTemplateSelect = (templateId) => {
    const template = industryTemplates?.find(t => t?.id === templateId);
    setWizardData(prev => ({
      ...prev,
      selectedTemplate: template
    }));
  };

  const handleBusinessDetailsChange = (formData) => {
    setWizardData(prev => ({
      ...prev,
      businessDetails: formData
    }));
  };

  const handlePersonalityChange = (personality) => {
    setWizardData(prev => ({
      ...prev,
      personality
    }));
  };

  const handleIntegrationToggle = (integrationId, enabled) => {
    setWizardData(prev => ({
      ...prev,
      integrations: {
        ...prev?.integrations,
        [integrationId]: {
          ...prev?.integrations?.[integrationId],
          enabled
        }
      }
    }));
  };

  const handleIntegrationUpdate = (integrationId, updates) => {
    setWizardData(prev => ({
      ...prev,
      integrations: {
        ...prev?.integrations,
        [integrationId]: {
          ...prev?.integrations?.[integrationId],
          ...updates
        }
      }
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return wizardData?.selectedTemplate !== null;
      case 2:
        const { businessName, contactPhone, businessEmail } = wizardData?.businessDetails;
        return businessName && contactPhone && businessEmail;
      case 3:
        return wizardData?.personality !== null;
      case 4:
        return Object.values(wizardData?.integrations)?.some(integration => integration?.enabled);
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === steps?.length) {
      // Complete setup
      setIsLoading(true);
      try {
        // Simulate API call to save configuration
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Clear saved progress
        localStorage.removeItem('wizardProgress');
        
        // Move to completion screen
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error('Setup failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleTestAgent = () => {
    // In a real app, this would open a test chat interface
    alert('Test chat interface would open here!');
  };

  const renderStepContent = () => {
    if (currentStep > steps?.length) {
      return (
        <CompletionScreen
          setupData={wizardData}
          onGoToDashboard={handleGoToDashboard}
          onTestAgent={handleTestAgent}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Choose Your Industry Template</h2>
              <p className="text-muted-foreground">
                Select the template that best matches your business type for optimized AI responses
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {industryTemplates?.map((template) => (
                <IndustryTemplateCard
                  key={template?.id}
                  template={template}
                  isSelected={wizardData?.selectedTemplate?.id === template?.id}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Business Details</h2>
              <p className="text-muted-foreground">
                Configure your business information and operating hours
              </p>
            </div>
            <BusinessDetailsForm
              formData={wizardData?.businessDetails}
              onFormChange={handleBusinessDetailsChange}
            />
          </div>
        );

      case 3:
        return (
          <PersonalitySelector
            selectedPersonality={wizardData?.personality}
            onPersonalityChange={handlePersonalityChange}
            previewData={wizardData}
          />
        );

      case 4:
        return (
          <IntegrationSetup
            integrations={wizardData?.integrations}
            onIntegrationToggle={handleIntegrationToggle}
            onIntegrationUpdate={handleIntegrationUpdate}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} transition-all duration-300`}>
        <Header />
        
        <main className="min-h-screen pb-20 lg:pb-0">
          {currentStep <= steps?.length && (
            <StepIndicator
              currentStep={currentStep}
              totalSteps={steps?.length}
              steps={steps}
            />
          )}
          
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-card rounded-xl border border-border min-h-[600px]">
              <div className="p-8">
                {renderStepContent()}
              </div>
            </div>
          </div>
        </main>

        {currentStep <= steps?.length && (
          <div className="fixed bottom-0 left-0 right-0 lg:static">
            <WizardNavigation
              currentStep={currentStep}
              totalSteps={steps?.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
              isNextDisabled={!validateCurrentStep()}
              isLoading={isLoading}
              showSkip={currentStep === 2 || currentStep === 4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentSetupWizard;
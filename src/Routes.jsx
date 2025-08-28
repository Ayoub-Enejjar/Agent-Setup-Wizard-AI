import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import BookingManagement from './pages/booking-management';
import Dashboard from './pages/dashboard';
import IntegrationManagement from './pages/integration-management';
import AgentSetupWizard from './pages/agent-setup-wizard';
import PaymentProcessing from './pages/payment-processing';
import LoginScreen from './pages/login-screen';
import RegistrationScreen from './pages/registration-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AgentSetupWizard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/integration-management" element={<IntegrationManagement />} />
        <Route path="/agent-setup-wizard" element={<AgentSetupWizard />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/registration-screen" element={<RegistrationScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
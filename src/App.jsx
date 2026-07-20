import React from "react";
import Routes from "./Routes";
import { AgentProvider } from "./context/agentContext";
import AIChatWidget from "./components/AIChatWidget";

function App() {
  return (
    <AgentProvider>
      <Routes />
      <AIChatWidget />
    </AgentProvider>
  );
}

export default App;

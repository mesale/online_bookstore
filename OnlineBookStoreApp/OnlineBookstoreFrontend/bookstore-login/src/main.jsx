import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import './index.css'
import App from './App.jsx'

// src/main.jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ 
        onLoad: "check-sso", 
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        checkLoginIframe: false // This line stops the 404 request
      }}
    >
      <App />
    </ReactKeycloakProvider>
  </StrictMode>
);

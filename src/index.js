import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './components/Notifications/NotificationContext';
import { AuthProvider } from './components/Auth/AuthContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

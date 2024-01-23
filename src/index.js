import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CallContextProvider } from './contexts/CallContext';
import { NextUIProvider } from "@nextui-org/react";
import { TermModalContextProvider } from './contexts/TermModelContext';
import { FeedbackModalContextProvider } from './contexts/FeedbackContext';
// import ContextWrapper from './components/schedule/context/ContextWrapper';
import { Toaster, toast } from 'sonner'
import { AnalyticsContextProvider } from './contexts/AnalyticsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CallContextProvider>
      <TermModalContextProvider>
        <FeedbackModalContextProvider>
          <NextUIProvider>
              <AnalyticsContextProvider>
                 <App />
              <Toaster position="top-right" richColors/>
              </AnalyticsContextProvider>
            {/* </ContextWrapper> */}
          </NextUIProvider>
        </FeedbackModalContextProvider>
      </TermModalContextProvider>
    </CallContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);



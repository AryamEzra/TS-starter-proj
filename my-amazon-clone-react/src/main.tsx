import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';

import './styles/shared/general.css';
import './styles/shared/amazon-header.css';
import './styles/pages/amazon.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './globalStyle';
import 'react-loading-skeleton/dist/skeleton.css';
import { telegram_disableVerticalSwipes, telegram_expand, telegram_ready } from './Telegram/utils.ts';

telegram_ready();
telegram_expand();
telegram_disableVerticalSwipes();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyle />
        <App />
    </React.StrictMode>,
)

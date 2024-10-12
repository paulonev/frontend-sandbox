import ReactDOM from 'react-dom/client'
import { App } from './App.tsx';

// Uncomment when integrate telegram ui kit
import '@telegram-apps/telegram-ui/dist/styles.css';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import "./mockEnv.ts"

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

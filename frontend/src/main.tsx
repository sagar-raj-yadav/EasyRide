import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ContextProvider } from "./Context/Api";

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)

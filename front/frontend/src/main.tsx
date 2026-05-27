import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext' // 👈 경로 확인해서 추가하세요!

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> {/* 👈 App을 감싸야 합니다! */}
      <App />
    </UserProvider>
  </StrictMode>,
)
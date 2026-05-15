import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/header';
import OrgPage from './pages/OrgPage';
import AdminPage from './pages/AdminPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* 헤더는 모든 페이지에서 공통으로 보입니다 */}
        <Header />
        
        {/* 실제 콘텐츠가 바뀌는 영역 */}
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/org" element={<OrgPage />} />
            <Route path="/org" element={<OrgPage />} />
            <Route path="/board" element={<PostPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
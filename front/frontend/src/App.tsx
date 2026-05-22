import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './layout/header';
import OrgPage from './pages/OrgPage';
import AdminPage from './pages/AdminPage';
import PostPage from './pages/Post/PostPage';
import Door from './pages/Door'; // 1. Door 컴포넌트 import 추가!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. 첫 접속(/) 시 헤더 없이 완전히 독립된 로그인(Door) 화면만 보여줍니다 */}
        <Route path="/" element={<Door />} />

        {/* 3. 로그인 이후의 페이지들은 이곳에 묶어서 공통 헤더와 레이아웃을 씌웁니다 */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              {/* 사내 서비스 전용 공통 헤더 */}
              <Header />
              <main className="max-w-7xl mx-auto p-6">
                <Routes>
                  <Route path="org" element={<OrgPage />} />
                  <Route path="board" element={<PostPage />} />
                  <Route path="admin" element={<AdminPage />} />
                  {/* 잘못된 주소로 들어오면 다시 첫 화면(로그인)으로 튕겨내기 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
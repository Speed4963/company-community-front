import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/header";
import OrgPage from "./pages/OrgPage";
import AdminPage from "./pages/AdminPage";
import PostList from "./pages/Post/PostList";
import Door from "./pages/Door"; // 1. Door 컴포넌트 import 추가!
import PostWrite from "./pages/Post/PostWrite";
import PostDetail from "./pages/Post/PostDetail";
import PostUpdate from "./pages/Post/PostUpdate";

function App() {
  return (
    // App.tsx 수정 방향
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Door />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="max-w-7xl mx-auto p-6">
                {/* ⚠️ 이 내부 Routes 안에 Route들이 깔끔하게 들어가야 합니다 */}
                <Routes>
                  <Route path="org" element={<OrgPage />} />
                  <Route path="posts" element={<PostList />} />
                  <Route path="posts/new" element={<PostWrite />} />
                  <Route path="posts/:postId" element={<PostDetail />} />
                  <Route path="posts/:postId/edit" element={<PostUpdate />} />
                  <Route path="admin" element={<AdminPage />} />
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

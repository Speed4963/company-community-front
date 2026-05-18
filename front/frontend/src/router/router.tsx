import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/layout'; 
import OrgPage from '../pages/OrgPage';
import Door from '../pages/Door';

const router = createBrowserRouter([
  {
    // 1. 사이트 첫 진입 시(/) 무조건 Door(로그인) 컴포넌트를 띄웁니다.
    path: '/',
    element: <Door />,
  },
  {
    // 2. 로그인 이후의 사내 페이지들은 /app 이라는 기준 주소 아래로 묶어줍니다.
    path: '/app', 
    element: <Layout />,
    children: [
      {
        // /app 까지만 입력하고 들어왔을 때 기본으로 보여줄 페이지 (예: 조직도)
        path: '', 
        element: <Navigate to="org" replace />,
      },
      {
        // 슬래시(/)를 빼고 적어야 안전합니다. (최종 주소: /app/org)
        path: 'org',
        element: <OrgPage />,
      },
      {
        // 최종 주소: /app/post
        path: 'post',
        element: <div style={{ padding: '20px' }}>게시판 페이지 준비 중</div>,
      },
      {
        // 최종 주소: /app/admin
        path: 'admin',
        element: <div style={{ padding: '20px' }}>관리자 페이지 준비 중</div>,
      },
    ],
  },
  {
    // 주소창에 이상한 경로를 치면 무조건 로그인(/) 페이지로 튕겨내기
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default router;
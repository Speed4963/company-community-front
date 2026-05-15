import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout'; // 파일명이 소문자면 소문자로!
import OrgPage from '../pages/OrgPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <div style={{ padding: '20px' }}></div>,
      },
      {
        path: '/org',
        element: <OrgPage />,
      },
      {
        path: '/post',
        element: <div style={{ padding: '20px' }}>게시판 페이지 준비 중</div>,
      },
      {
        path: '/admin',
        element: <div style={{ padding: '20px' }}>관리자 페이지 준비 중</div>,
      },
    ],
  },
]);

export default router;
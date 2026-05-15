import { Outlet } from 'react-router-dom';
import Header from '../layout/header';

const Layout = () => {
  return (
    <>
      <Header />
      {/* Outlet 자리에 실제 페이지 컴포넌트들이 들어갑니다 */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
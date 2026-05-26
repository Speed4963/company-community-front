import { Link } from 'react-router-dom';
import logoImg from '../common/image/logo3.png';

const Header = () => {
  return (
    <header style={{
      width: '100%',
      backgroundColor: '#1E56A0', 
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      position: 'sticky',
      top: 0,
    }}>
      <div style={{
        maxWidth: '1280px', // 조금 더 넓게 잡아 시원한 느낌 부여
        margin: '0 auto',
        padding: '0 30px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
      }}>
        
        {/* 1. 로고 영역: 높이를 살짝 줄여 여백(Breathing Room) 확보 */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: '60px' }}>
          <img 
            src={logoImg} 
            alt="D Technology Logo"
            style={{
              height: '60px', // 60px에서 48px로 조절 (상하 여백 각 8px로 황금비율)
              width: 'auto',
              display: 'block',
              transition: 'transform 0.2s'
            }}
          />
        </Link>

        {/* 2. 메인 메뉴: 배열을 활용하여 링크 연결 */}
<nav style={{ display: 'flex', gap: '45px' }}>
  {[
    { label: '조직도', path: '/org' },
    { label: '게시판', path: '/post' },
    { label: '관리', path: '/admin' }
  ].map((item, idx) => (
    <Link 
      key={idx}
      to={item.path} // router.tsx에 설정한 path와 일치해야 합니다.
      style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontWeight: '600', 
        fontSize: '15px',
        opacity: 0.8,
        transition: 'opacity 0.2s',
        position: 'relative' // 하단 바 효과를 위해 추가
      }}
      // 마우스 올렸을 때 효과
      onMouseOver={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
    >
      {item.label}
    </Link>
  ))}
</nav>

        {/* 3. 사용자 정보 영역: marginLeft: 'auto'로 오른쪽 끝으로 밀기 */}
        <div style={{
          marginLeft: 'auto', 
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          paddingLeft: '24px',
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          height: '20px' // 구분선 높이 최적화
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, opacity: 0.9 }}>
            <span style={{ fontWeight: '700' }}>홍길동</span> 사원님 환영합니다!
          </p>
        </div>

      </div>
    </header>
  );
};

export default Header;
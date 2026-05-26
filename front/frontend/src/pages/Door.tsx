import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Door.css';
import logoImg from '../common/image/logo3.png';

interface LoginRequest {
  eno: string;      
  ename: string;     
  birthdate: string; 
}

const Door: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequest>({
    eno: "",
    ename: "",
    birthdate: "",
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { eno, ename, birthdate } = formData;

    if (!eno.trim() || !ename.trim() || !birthdate) {
      setError("모든 사원 정보를 정확히 입력해주세요.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const response = await fetch('http://localhost:8080/api/emp/login', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eno: Number(eno), 
          ename: ename,
          birthdate: birthdate 
        }),
      });

      if (!response.ok) {
        const errorMsg = await response.text(); 
        throw new Error(errorMsg || '인증에 실패했습니다. 사원 정보를 다시 확인하세요.');
      }

      const loginUser = await response.json(); 
      
      localStorage.setItem('emp_name', loginUser.ename);
      localStorage.setItem('emp_eno', String(loginUser.eno));
      localStorage.setItem('emp_dno', String(loginUser.dno)); 

      navigate('/org'); 

    } catch (err: any) {
      setError(err.message || "서버 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="door-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center',
      minHeight: '100vh',         
      width: '100vw',
      backgroundColor: '#1B54A0', 
      boxSizing: 'border-box',
      padding: '20px',
      paddingTop: '60px'           
    }}>
      
      {/* 로고 이미지 컨테이너 */}
      <div className="logo-placeholder" style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',          
        justifyContent: 'center', 
        alignItems: 'center',     
        marginBottom: '10px',      
      }}>
        <img src={logoImg} alt="D Technology Logo" style={{ display: 'block' }} />
      </div>

      <form onSubmit={handleLogin} className="login-form" style={{
        width: '100%',
        maxWidth: '400px',        
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'          
      }}>
        
        {/* 사원번호 입력 (eno) */}
        <div className="input-group" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          marginBottom: '20px'     
        }}>
          {/* 💡 배경색이 진해졌으므로 라벨 텍스트를 화이트 계열(#e5e7eb)로 변경하여 뚜렷하게 보이도록 조치 */}
          <label htmlFor="eno" style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>사원번호</label>
          <input
            type="text"
            id="eno"
            name="eno"
            placeholder="사원번호를 입력하세요 (예: 1001)"
            value={formData.eno}
            onChange={handleChange}
            disabled={isLoading}
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* 이름 입력 (ename) */}
        <div className="input-group" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          marginBottom: '20px'
        }}>
          <label htmlFor="ename" style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>이름</label>
          <input
            type="text"
            id="ename"
            name="ename"
            placeholder="성함을 입력하세요"
            value={formData.ename}
            onChange={handleChange}
            disabled={isLoading}
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* 생년월일 입력 (birthdate) */}
        <div className="input-group" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          marginBottom: '28px'
        }}>
          <label htmlFor="birthdate" style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>생년월일</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            disabled={isLoading}
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <div className="error-msg" style={{ 
            color: '#fca5a5', // 어두운 청색 배경에서 에러가 더 잘 보이도록 연한 파스텔 레드 계열로 보정
            fontSize: '13px', 
            marginBottom: '16px', 
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {/* 로그인 버튼 */}
        <button 
          type="submit" 
          className="login-btn" 
          disabled={isLoading}
          style={{
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          {isLoading ? '임직원 정보 확인 중...' : ' 로그인'}
        </button>
      </form>

      {/* 카피라이트 푸터 */}
      <footer className="login-footer" style={{ 
        marginTop: '50px',        
        fontSize: '13px', 
        color: '#9ca3af', // 푸터 텍스트 선명도 확보
        textAlign: 'center'
      }}>
        © D Technology
      </footer>
    </div>
  );
};

export default Door;

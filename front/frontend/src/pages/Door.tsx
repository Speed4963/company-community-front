import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Door.css';

// 백엔드 전달 및 관리용 타입 정의
interface LoginRequest {
  eno: string;       // 폼 입력 단계에서는 문자열로 받음
  ename: string;     // 이름 (Column: ename)
  birthdate: string; // 생년월일 (Column: birthdate)
}

const Door: React.FC = () => {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [formData, setFormData] = useState<LoginRequest>({
    eno: '',
    ename: '',
    birthdate: '',
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. 입력값 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. 백엔드 API 연동 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { eno, ename, birthdate } = formData;

    // 간단한 전송 전 유효성 검사
    if (!eno.trim() || !ename.trim() || !birthdate) {
      setError('모든 사원 정보를 정확히 입력해주세요.');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      // 🛠️ 수정포인트 1: 백엔드 포트(8080) 지정 및 정확한 엔드포인트(/api/emp/login) 매칭
      const response = await fetch('http://localhost:8080/api/emp/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eno: Number(eno), // 🛠️ 수정포인트 2: 사원번호를 자바 스펙에 맞춰 숫자(Number)로 변환!
          ename: ename,
          birthdate: birthdate // 'yyyy-MM-dd' 형식 포맷은 자바 LocalDate와 자동 연동됨
        }),
      });

      // 🛠️ 수정포인트 3: 에러 발생 시 백엔드 `e.getMessage()` 텍스트 출력 대응
      if (!response.ok) {
        const errorMsg = await response.text(); // EmpController가 실패 시 e.getMessage() 문자열을 반환함
        throw new Error(errorMsg || '인증에 실패했습니다. 사원 정보를 다시 확인하세요.');
      }

      // 🛠️ 수정포인트 4: 백엔드에서 성공 시 ResponseEntity.ok(loginUser)로 사원 Entity 객체를 통째로 줌
      const loginUser = await response.json(); 
      console.log('인증 성공 임직원 정보:', loginUser);
      
      // 세션과 별개로 프론트엔드단 화면에 사용할 정보를 로컬 스토리지에 기입
      localStorage.setItem('emp_name', loginUser.ename);
      localStorage.setItem('emp_eno', String(loginUser.eno));

      // 메인 사내화면(조직도)으로 이동
      navigate('/org'); 

    } catch (err: any) {
      setError(err.message || '서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="door-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🔒</div>
          <h1>사내 게시판 시스템</h1>
          <p>임직원 인증 후 입장이 가능합니다.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {/* 사원번호 입력 (eno) */}
          <div className="input-group">
            <label htmlFor="eno">사원번호</label>
            <input
              type="text"
              id="eno"
              name="eno"
              placeholder="사원번호를 입력하세요 (예: 1001)"
              value={formData.eno}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          {/* 이름 입력 (ename) */}
          <div className="input-group">
            <label htmlFor="ename">이름</label>
            <input
              type="text"
              id="ename"
              name="ename"
              placeholder="성함을 입력하세요"
              value={formData.ename}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          {/* 생년월일 입력 (birthdate) */}
          <div className="input-group">
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? '임직원 정보 확인 중...' : '인증 및 로그인'}
          </button>
        </form>

        <footer className="login-footer">
          © Corporate Board Security System
        </footer>
      </div>
    </div>
  );
};

export default Door;
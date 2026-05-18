import axios from 'axios';
import type { IEmp } from '../types/IEmp'; // 이전에 만든 IEmp 인터페이스 경로에 맞게 수정하세요.
 // 이전에 만든 IEmp 인터페이스 경로에 맞게 수정하세요.

// 백엔드 스프링 부트 사원 API 주소 직접 지정
const API_URL = 'http://localhost:8080/api/emp';

const empService = {
  // 1. 사원번호(ENO)로 상세 정보 조회
  // 예: getEmpByEno(1001)
  getEmpByEno: async (eno: number) => {
    const response = await axios.get<IEmp>(`${API_URL}/${eno}`);
    return response.data;
  },

  // 2. 이름(ENAME)으로 사원 검색
  // 예: searchEmpsByName("홍길동")
  searchEmpsByName: async (ename: string) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/search`, {
      params: {
        ename, // 쿼리 스트링 (?ename=홍길동)으로 전달됩니다.
      },
    });
    return response.data;
  },

  // 3. 특정 부서(DNO) 소속 사원 목록 조회
  // 예: getEmpsByDepartment(10)
  getEmpsByDepartment: async (dno: number) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/dept/${dno}`);
    return response.data;
  },

  // 4. 특정 직급(JOB)의 사원 목록 조회
  // 예: getEmpsByJob("MANAGER")
  getEmpsByJob: async (job: string) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/job/${job}`);
    return response.data;
  },
};

export default empService;
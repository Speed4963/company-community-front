import axios from 'axios';
import type { IEmp } from '../types/IEmp';

// 백엔드 스프링 부트 사원 API 주소 직접 지정
const API_URL = 'http://localhost:8080/api/emp';

const empService = {
  // 1. 사원번호(ENO)로 상세 정보 조회
  getEmpByEno: async (eno: number) => {
    const response = await axios.get<IEmp>(`${API_URL}/${eno}`);
    return response.data;
  },

  // 2. 이름(ENAME)으로 사원 검색
  searchEmpsByName: async (ename: string) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/search`, {
      params: {
        ename, 
      },
    });
    return response.data;
  },

  // 3. 특정 부서(DNO) 소속 사원 목록 조회
  getEmpsByDepartment: async (dno: number) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/dept/${dno}`);
    return response.data;
  },

  // 4. 특정 직급(JOB)의 사원 목록 조회
  getEmpsByJob: async (job: string) => {
    const response = await axios.get<IEmp[]>(`${API_URL}/job/${job}`);
    return response.data;
  },

  // 🌟 5. 사원 정보 수정 (U)
  // 예: empService.updateEmp(1001, { ename: '홍길동', job: '과장', ... })
  updateEmp: async (eno: number, updateRequest: Partial<IEmp>) => {
    // Partial<IEmp>를 사용하면 수정하고 싶은 데이터만 골라서 보낼 수 있어서 편리합니다.
    const response = await axios.put<IEmp>(`${API_URL}/${eno}`, updateRequest);
    return response.data;
  },

  // 🌟 6. 사원 정보 삭제 (D)
  // 예: empService.deleteEmp(1001)
  deleteEmp: async (eno: number) => {
    const response = await axios.delete<string>(`${API_URL}/${eno}`);
    return response.data; // 백엔드에서 보낸 성공 메시지 문자열 반환
  },
};

export default empService;
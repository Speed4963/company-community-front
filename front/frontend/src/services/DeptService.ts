import axios from 'axios';
import type { IDept } from '../types/IDept'; // 이전에 만든 IDept 인터페이스 경로
 // 이전에 만든 IDept 인터페이스 경로

// Spring 부트의 Pageable 응답 구조 매핑
export interface IPageResponse<T> {
  content: T[];          // 실제 부서 데이터 배열
  totalPages: number;    // 전체 페이지 수
  totalElements: number; // 전체 데이터 개수
  size: number;          // 한 페이지당 데이터 개수
  number: number;        // 현재 페이지 번호
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 백엔드 스프링 부트 서버 주소 직접 지정
const API_URL = 'http://localhost:8080/api/dept';

const deptService = {
  // 1. 부서 목록 조회 (검색어 + 페이징)
  // 예: getDeptList("개발", 0, 10)
  getDeptList: async (searchKeyword: string = '', page: number = 0, size: number = 10) => {
    const response = await axios.get<IPageResponse<IDept>>(API_URL, {
      params: {
        searchKeyword,
        page,
        size,
      },
    });
    return response.data;
  },

  // 2. 부서 상세 조회
  getDeptDetail: async (dno: number) => {
    const response = await axios.get<IDept>(`${API_URL}/${dno}`);
    return response.data;
  },

  // 3. 부서 생성 (C)
  createDept: async (deptData: IDept) => {
    const response = await axios.post<IDept>(API_URL, deptData);
    return response.data;
  },

  // 4. 부서 수정 (U)
  updateDept: async (dno: number, deptData: IDept) => {
    const response = await axios.put<string>(`${API_URL}/${dno}`, deptData);
    return response.data; // 컨트롤러가 리턴하는 "수정 성공" 텍스트
  },

  // 5. 부서 삭제 (D)
  deleteDept: async (dno: number) => {
    const response = await axios.delete<string>(`${API_URL}/${dno}`);
    return response.data; // 컨트롤러가 리턴하는 "삭제 성공" 텍스트
  },
};

export default deptService;
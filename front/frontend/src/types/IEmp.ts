// IEmp.ts
// 목적: 백엔드 EmpDto와 매핑되는 사원 데이터 인터페이스
// 객체 자료형 별명: [{eno, ename, job, dno, hiredate, birthdate, pnumber, insertTime, updateTime}, {}]
// eno?, insertTime?, updateTime?: 백엔드 자동 생성 필드이므로 선택적(Optional) 처리
export interface IEmp {
  eno?: number;           // 사원 번호 (등록 시에는 없고, 조회 시에는 존재)
  ename: string;         // 사원 이름
  job: string;           // 직책
  dno: number;           // 소속 부서 번호
  hiredate: string;      // 입사일 (포맷: YYYY-MM-DD)
  birthdate: string;     // 생년월일 (포맷: YYYY-MM-DD)
  pnumber: number;       // 전화번호
  insertTime?: string;   // 등록 시간 (포맷: YYYY-MM-DDTHH:mm:ss)
  updateTime?: string;   // 수정 시간 (포맷: YYYY-MM-DDTHH:mm:ss)
}
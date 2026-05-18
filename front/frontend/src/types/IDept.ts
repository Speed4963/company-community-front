// IDept.ts
// 목적: 백엔드 DeptDto와 매핑되는 부서 데이터 인터페이스
// 객체 자료형 별명: [{dno, dname, loc, dnumber}, {}]
// dno?, dnumber?: 백엔드 전송 및 조회 조건에 따라 포함되지 않을 수 있음
export interface IDept {
  dno?: number;       // 부서 번호 (등록 시에는 없고, 조회 시에는 존재)
  dname: string;      // 부서명
  loc: string;        // 위치
  dnumber?: number;   // 부서 인원수 혹은 관련 번호 (선택적 조회 가능)
}
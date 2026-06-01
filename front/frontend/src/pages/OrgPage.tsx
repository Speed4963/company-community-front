import React, { useState, useEffect } from 'react';
import deptService from '../services/DeptService'; 
import empService from '../services/EmpService';   
import type { IDept } from '../types/IDept';
import type { IEmp } from '../types/IEmp';

// ==========================================
// 0-1. 부서 상세 정보 및 수정/삭제 모달 컴포넌트
// ==========================================
const DeptDetailModal = ({ 
  dept, 
  onClose, 
  onSave,
  onDelete,
  isReadOnly 
}: { 
  dept: IDept; 
  onClose: () => void; 
  onSave: (updated: IDept) => void;
  onDelete: (dno: number, dname: string) => void;
  isReadOnly: boolean;
}) => {
  const [form, setForm] = useState<IDept>({ ...dept });

  const handleChange = (field: keyof IDept, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 10000, cursor: 'default'
    }} onClick={onClose}>
      <form style={{
        backgroundColor: '#ffffff', padding: '28px', borderRadius: '10px',
        width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }} onClick={e => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#1E56A0', fontSize: '17px', fontWeight: '700' }}>
            {isReadOnly ? '부서 정보 조회' : '🏢 부서 정보 수정'}
          </h3>
          {!isReadOnly && (
            <button 
              type="button" 
              onClick={() => onDelete(form.dno!, form.dname || '')}
              style={{ border: 'none', backgroundColor: '#fee2e2', color: '#dc2626', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
            >
               삭제
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>부서명</label>
            <input type="text" value={form.dname || ''} onChange={e => handleChange('dname', e.target.value)} required disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>부서위치</label>
            <input type="text" value={form.loc || ''} onChange={e => handleChange('loc', e.target.value)} disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>부서번호 (DNUMBER)</label>
            <input type="text" value={form.dnumber || ''} onChange={e => handleChange('dnumber', e.target.value)} disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          {isReadOnly ? (
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#1E56A0', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#ffffff' }}>
              확인 (닫기)
            </button>
          ) : (
            <>
              <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#4b5563' }}>취소</button>
              <button type="submit" style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#1E56A0', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#ffffff' }}>변경사항 저장</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};


//  사원 상세 정보 모달 컴포넌트

const EmployeeDetailModal = ({ 
  emp, 
  onClose, 
  onSave,
  onDelete,
  isReadOnly 
}: { 
  emp: IEmp; 
  onClose: () => void; 
  onSave: (updated: IEmp) => void;
  onDelete: (eno: number) => void;
  isReadOnly: boolean;
}) => {
  const [form, setForm] = useState<IEmp>({ ...emp });

  const handleChange = (field: keyof IEmp, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 10000, cursor: 'default'
    }} onClick={onClose}>
      <form style={{
        backgroundColor: '#ffffff', padding: '28px', borderRadius: '10px',
        width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }} onClick={e => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#1E56A0', fontSize: '17px', fontWeight: '700' }}>
            {isReadOnly ? ' 사원 정보 ' : ' 사원 정보 수정'}
          </h3>
          {!isReadOnly && (
            <button 
              type="button" 
              onClick={() => onDelete(form.eno!)}
              style={{ border: 'none', backgroundColor: '#fee2e2', color: '#dc2626', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
            >
              삭제
            </button>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>사원번호</label>
            <input type="text" value={form.eno || ''} disabled style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', backgroundColor: '#f3f4f6', color: '#9ca3af' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>사원명</label>
            <input type="text" value={form.ename || ''} onChange={e => handleChange('ename', e.target.value)} required disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>직급</label>
            <input type="text" value={form.job || ''} onChange={e => handleChange('job', e.target.value)} required disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>소속 부서번호(DNO)</label>
            <input type="number" value={form.dno || ''} onChange={e => handleChange('dno', Number(e.target.value))} required disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>비상연락망</label>
          <input type="text" value={form.pnumber || ''} onChange={e => handleChange('pnumber', e.target.value)} required disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>입사일</label>
          <input type="text" value={form.hiredate || ''} onChange={e => handleChange('hiredate', e.target.value)} placeholder="YYYY-MM-DD" disabled={isReadOnly} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', backgroundColor: isReadOnly ? '#f3f4f6' : '#fff' }} />
        </div>
        </div>
         

        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          {isReadOnly ? (
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#1E56A0', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#ffffff' }}>
              확인 (닫기)
            </button>
          ) : (
            <>
              <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#4b5563' }}>취소</button>
              <button type="submit" style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#1E56A0', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#ffffff' }}>정보 수정 저장</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

// ==========================================
// 1. DB 평면 데이터를 4단계 피라미드 구조로 변환
// ==========================================
const buildOrgTree = (deptList: IDept[]) => {
  const findDept = (dno: number) => deptList.find(d => d.dno === dno);
  
  const rootDept = findDept(10); 
  const vpDept = findDept(20);   
  const execDept = findDept(30); 
  
  const teamOrder = [40, 50, 60, 70, 80, 90, 95]; 
  const teams = teamOrder
    .map(dno => findDept(dno))
    .filter((d): d is IDept => d !== undefined);

  if (!rootDept) return null;

  return {
    ...rootDept,
    children: vpDept ? [{
      ...vpDept,
      children: execDept ? [{
        ...execDept,
        children: teams
      }] : []
    }] : []
  };
};

// ==========================================
// 2. 왼쪽 사이드바 개별 부서 아이템 컴포넌트
// ==========================================
const SidebarItem = ({ 
  dept, 
  isOpen, 
  onClick,
  onEmployeeClick, 
  refreshKey       
}: { 
  dept: { dname: string; dno?: number }; 
  isOpen: boolean;
  onClick: () => void;
  onEmployeeClick: (emp: IEmp) => void;
  refreshKey: number;
}) => {
  const [employees, setEmployees] = useState<IEmp[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmployees([]);
  }, [refreshKey]);

  useEffect(() => {
    if (isOpen && employees.length === 0 && dept.dno) {
      const currentDno = dept.dno; 

      const loadEmployees = async () => {
        setLoading(true);
        try {
          const data = await empService.getEmpsByDepartment(currentDno);
          setEmployees(data);
        } catch (err) {
          console.error("사이드바 사원 조회 실패:", err);
        } finally {
          setLoading(false);
        }
      };
      loadEmployees();
    }
  }, [isOpen, dept.dno, employees.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div 
        onClick={onClick} 
        style={{
          padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
          backgroundColor: 'transparent', color: '#4b5563', fontWeight: '500',
          transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '10px', userSelect: 'none'
        }}
      >
        <span style={{ opacity: 0.6 }}>.</span>
        {dept.dname}
      </div>
      
      {isOpen && dept.dno && (
        <div style={{ paddingLeft: '34px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
          {loading ? (
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>조회 중...</div>
          ) : employees.length === 0 ? (
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>소속 사원 없음</div>
          ) : (
            employees.map(emp => (
              <div 
                key={emp.eno} 
                onClick={(e) => { e.stopPropagation(); onEmployeeClick(emp); }} 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '3px 6px', borderRadius: '4px' }}
              >
                <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563', fontWeight: 'bold' }}>
                  {emp.job}
                </span>
                <span style={{ color: '#111827', fontWeight: '500' }}>{emp.ename}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. 오른쪽 조직도 차트 노드 컴포넌트
// ==========================================
const OrgNode = ({ 
  node, 
  isChild = false, 
  isLong = false,
  openDept,
  setOpenDept,
  onRefresh,
  onEmployeeClick, 
  onDeptEditClick, 
  refreshKey,
  loginUserDno 
}: { 
  node: any; 
  isChild?: boolean; 
  isLong?: boolean;
  openDept: string;
  setOpenDept: React.Dispatch<React.SetStateAction<string>>;
  onRefresh: () => void;
  onEmployeeClick: (emp: IEmp) => void;
  onDeptEditClick: (dept: IDept) => void; 
  refreshKey: number;
  loginUserDno: number;
}) => {
  const [employees, setEmployees] = useState<IEmp[]>([]); 
  const [loading, setLoading] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const isMultiple = hasChildren && node.children.length > 1;
  const upLineHeight = isLong ? 140 : 40;

  const isOpen = openDept === node.dname;

  useEffect(() => {
    setEmployees([]);
  }, [refreshKey]);

  useEffect(() => {
    if (isOpen && node.dno) {
      const currentDno = node.dno; 

      if (employees.length === 0) {
        const loadEmployees = async () => {
          setLoading(true);
          try {
            const data = await empService.getEmpsByDepartment(currentDno);
            setEmployees(data);
          } catch (err) {
            console.error("조직도 노드 사원 조회 실패:", err);
          } finally {
            setLoading(false);
          }
        };
        loadEmployees();
      }

      setTimeout(() => {
        const targetElement = document.getElementById(`dept-card-${currentDno}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }, 150);
    }
  }, [isOpen, node.dno, employees.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: isLong ? '120px' : (isChild && isMultiple ? '40px' : '20px') }}>
      <div 
        id={node.dno ? `dept-card-${node.dno}` : undefined} 
        onClick={() => setOpenDept(isOpen ? '' : node.dname)} 
        style={{
          padding: '15px 20px', backgroundColor: '#e2e2e2', borderRadius: '4px', textAlign: 'center',
          minWidth: '220px', zIndex: 2, fontSize: '13px', lineHeight: '1.6', position: 'relative',
          border: '1px solid #d1d5db', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', userSelect: 'none', transition: 'all 0.2s ease-in-out'
        }}
      >
        {isChild && (
          <div style={{ position: 'absolute', top: `-${upLineHeight}px`, left: '50%', width: '1px', height: `${upLineHeight}px`, backgroundColor: '#000', transform: 'translateX(-50%)' }} />
        )}
        
        {/* 부서 상자 내부 타이틀 정렬 레이아웃 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
          
          {/* 🛠️ [정렬 개선 핵심] 여백치우침 제거: 정중앙 중심선 정렬 매칭 완료 */}
          <div style={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>
            {node.dname}
          </div>

          {/* 관리자 권한(90번)일 때 우측 끝에 배치되는 절대좌표 수정 버튼 */}
          {loginUserDno === 90 && (
            <button
              type="button"
              onClick={(e) => { 
                e.stopPropagation(); 
                onDeptEditClick({ dno: node.dno, dname: node.dname, loc: node.loc, dnumber: node.dnumber }); 
              }}
              style={{
                position: 'absolute', right: '-6px', padding: '2px 6px', fontSize: '11px',
                backgroundColor: '#fff', border: '1px solid #c4c4c4', borderRadius: '3px',
                color: '#4b5563', cursor: 'pointer', fontWeight: 'normal'
              }}
            >
              수정
            </button>
          )}
        </div>

        {isOpen && (
          <div style={{ fontSize: '13px', color: '#333', marginTop: '8px', borderTop: '1px solid #ccc', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ 
              fontSize: '11px', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '6px 8px', borderRadius: '4px', 
              textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2px', border: '1px solid #e5e7eb'
            }}>
              <div>부서위치: <span style={{ fontWeight: '500', color: '#111827' }}>{node.loc || '미지정'}</span></div>
              <div>부서번호: <span style={{ fontWeight: '500', color: '#111827' }}>{node.dnumber || '미지정'}</span></div>
            </div>

            <div style={{ borderTop: '1px dashed #e5e7eb', margin: '2px 0' }}></div>

            {loading ? (
              <div style={{ color: '#666', fontSize: '11px' }}>조회 중...</div>
            ) : employees.length === 0 ? (
              <div style={{ color: '#999', fontSize: '11px' }}>소속 사원 없음</div>
            ) : (
              employees.map((emp) => (
                <div 
                  key={emp.eno} 
                  onClick={(e) => { e.stopPropagation(); onEmployeeClick(emp); }} 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', padding: '2px 4px', borderRadius: '4px' }}
                >
                  <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '1px 5px', borderRadius: '4px', color: '#4b5563', fontWeight: 'bold', lineHeight: '1.4' }}>
                    {emp.job}
                  </span>
                  <span style={{ fontWeight: '500', color: '#111827', fontSize: '12px' }}>{emp.ename}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {hasChildren && (
        <div style={{ display: 'flex', position: 'relative', paddingTop: isMultiple ? '40px' : '60px' }}>
          <div style={{ position: 'absolute', top: '0', left: '50%', width: '1px', height: isMultiple ? '20px' : '60px', backgroundColor: '#000', transform: 'translateX(-50%)' }} />
          {isMultiple && (
            <div style={{ position: 'absolute', top: '20px', left: `${100 / (node.children.length * 2)}%`, right: `${100 / (node.children.length * 2)}%`, height: '1px', backgroundColor: '#000' }} />
          )}
          {node.children.map((child: any, idx: number) => {
            const shouldBeLong = idx === 1 || idx === 3 || idx === 5; 
            return (
              <div key={idx} style={{ position: 'relative', padding: '0 10px' }}>
                <OrgNode node={child} isChild={true} isLong={shouldBeLong} openDept={openDept} setOpenDept={setOpenDept} onRefresh={onRefresh} onEmployeeClick={onEmployeeClick} onDeptEditClick={onDeptEditClick} refreshKey={refreshKey} loginUserDno={loginUserDno} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. 메인 조직도 페이지 컴포넌트
// ==========================================
const OrgPage = () => {
  const [openDept, setOpenDept] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [treeData, setTreeData] = useState<any>(null); 
  const [sidebarDepts, setSidebarDepts] = useState<any[]>([]); 
  const [searchedEmployees, setSearchedEmployees] = useState<IEmp[]>([]); 

  const [selectedEmp, setSelectedEmp] = useState<IEmp | null>(null);
  const [selectedDept, setSelectedDept] = useState<IDept | null>(null); 
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [loginUserDno, setLoginUserDno] = useState<number>(90);

  const loadInitialData = async () => {
    try {
      const res = await deptService.getDeptList('', 0, 100);
      const deptList = res.content.filter((d: any) => d.dname !== '전체'); 

      setSidebarDepts(deptList);
      setTreeData(buildOrgTree(deptList));
    } catch (err) {
      console.error("부서 초기 데이터 로드 실패:", err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchedEmployees([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const data = await empService.searchEmpsByName(searchTerm);
        setSearchedEmployees(data);
      } catch (err) {
        console.error("사원 검색 실패:", err);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, refreshKey]); 

  const handleEmployeeSave = async (updatedEmp: IEmp) => {
    try {
      await empService.updateEmp(updatedEmp.eno!, updatedEmp);
      alert(`[${updatedEmp.ename}] 사원의 정보가 정상적으로 수정되었습니다.`);
      setSelectedEmp(null);
      setRefreshKey(prev => prev + 1); 
      loadInitialData();
    } catch (err) {
      console.error("사원 업데이트 오류:", err);
      alert("사원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleEmployeeDelete = async (eno: number) => {
    if (window.confirm("선택한 사원을 전사 명단에서 완전히 삭제하시겠습니까?\n이 작업은 복구할 수 없습니다.")) {
      try {
        await empService.deleteEmp(eno);
        alert("사원 명단 삭제 처리가 성공적으로 완료되었습니다.");
        setSelectedEmp(null);
        setRefreshKey(prev => prev + 1); 
        loadInitialData();
      } catch (err) {
        console.error("사원 삭제 오류:", err);
        alert("사원 삭제 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeptSave = async (updatedDept: IDept) => {
    try {
      await deptService.updateDept(updatedDept.dno!, updatedDept);
      alert(`[${updatedDept.dname}] 부서 정보가 성공적으로 수정되었습니다.`);
      setSelectedDept(null);
      loadInitialData();
    } catch (err) {
      console.error("부서 업데이트 오류:", err);
      alert("부서 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeptDelete = async (dno: number, dname: string) => {
    if (window.confirm(`[${dname}] 부서를 정말로 완전히 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      try {
        await deptService.deleteDept(dno);
        alert(`[${dname}] 부서가 완전히 삭제되었습니다.`);
        setSelectedDept(null);
        loadInitialData();
      } catch (err) {
        console.error("부서 삭제 오류:", err);
        alert("부서 삭제 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', backgroundColor: '#fff' }}>
      
      {/* --- 왼쪽 사이드바 영역 --- */}
      <aside style={{
        width: '300px', backgroundColor: '#f8f9fa', borderRight: '1px solid #e1e4e8',
        padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '20px'
      }}>
        <div style={{ fontSize: '11px', color: '#1e56a0', backgroundColor: '#f0f7ff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #dbeafe' }}>
          🔑 권한 부서 세션: <strong>{loginUserDno}번</strong>
          <button type="button" onClick={() => setLoginUserDno(loginUserDno === 90 ? 40 : 90)} style={{ marginLeft: '10px', padding: '2px 4px', fontSize: '10px', cursor: 'pointer' }}>
            부서 변경 테스트
          </button>
        </div>

        <h3 style={{ fontSize: '18px', color: '#1E56A0', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>
          사원 / 부서 검색
        </h3>
        
        <div style=
        {{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input 
            type="text" 
            placeholder="부서 또는 사원 검색" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{
              width: '250px', padding: '11px 12px 11px 38px', borderRadius: '8px', border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff', fontSize: '14px', color: '#111827', outline: 'none',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#1E56A0'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
          />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!searchTerm.trim() && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {sidebarDepts.map((dept, idx) => (
                <SidebarItem 
                  key={dept.dno || idx}
                  dept={dept}
                  isOpen={openDept === dept.dname} 
                  onClick={() => setOpenDept(prev => prev === dept.dname ? '' : dept.dname)}
                  onEmployeeClick={(emp) => setSelectedEmp(emp)} 
                  refreshKey={refreshKey}
                />
              ))}
            </div>
          )}

          {searchTerm.trim() && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', paddingLeft: '4px' }}>부서 결과</div>
                {sidebarDepts
                  .filter(dept => dept.dname.includes(searchTerm)) 
                  .map((dept, idx) => (
                    <SidebarItem 
                      key={dept.dno || idx}
                      dept={dept}
                      isOpen={openDept === dept.dname} 
                      onClick={() => setOpenDept(prev => prev === dept.dname ? '' : dept.dname)}
                      onEmployeeClick={(emp) => setSelectedEmp(emp)} 
                      refreshKey={refreshKey}
                    />
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #e5e7eb', paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', paddingLeft: '4px' }}>사원 검색 결과</div>
                {searchedEmployees.map((emp) => {
                  const targetDept = sidebarDepts.find(d => d.dno === emp.dno);

                  return (
                    <div 
                      key={emp.eno}
                      onClick={() => setSelectedEmp(emp)} 
                      style={{
                        padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563', fontWeight: 'bold' }}>
                          {emp.job}
                        </span>
                        <span style={{ color: '#111827', fontSize: '13px', fontWeight: '500' }}>{emp.ename}</span>
                      </div>
                      {targetDept && (
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{targetDept.dname}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </nav>
      </aside>

      {/* --- 오른쪽 조직도 본문 영역 --- */}
      <main style={{ 
        flex: 1, padding: '80px 40px', overflowX: 'auto', display: 'flex',
        justifyContent: 'flex-start', alignItems: 'flex-start'
      }}>
        <div style={{ display: 'inline-flex', paddingLeft: '50px' }}>
          {treeData ? (
            <OrgNode 
              node={treeData} 
              openDept={openDept} 
              setOpenDept={setOpenDept} 
              onRefresh={loadInitialData} 
              onEmployeeClick={(emp) => setSelectedEmp(emp)} 
              onDeptEditClick={(dept) => setSelectedDept(dept)} 
              refreshKey={refreshKey} 
              loginUserDno={loginUserDno} 
            />
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '6px', border: '1px solid #ffeeba', fontSize: '15px', fontWeight: 'bold' }}>
              ⚠️ 데이터 로딩 실패 또는 대표이사실을 찾을 수 없습니다.
            </div>
          )}
        </div>
      </main>

      {/* 사원 모달 제어 레이어 */}
      {selectedEmp && (
        <EmployeeDetailModal 
          emp={selectedEmp} 
          onClose={() => setSelectedEmp(null)} 
          onSave={handleEmployeeSave} 
          onDelete={handleEmployeeDelete} 
          isReadOnly={loginUserDno !== 90} 
        />
      )}

      {/* 부서 전용 모달 제어 레이어 */}
      {selectedDept && (
        <DeptDetailModal
          dept={selectedDept}
          onClose={() => setSelectedDept(null)}
          onSave={handleDeptSave}
          onDelete={handleDeptDelete}
          isReadOnly={loginUserDno !== 90}
        />
      )}

    </div>
  );
};

export default OrgPage;
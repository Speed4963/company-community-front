import React, { useState, useEffect } from 'react';
import deptService from '../services/DeptService'; 
import empService from '../services/EmpService';   
import type { IDept } from '../types/IDept';
import type { IEmp } from '../types/IEmp';

// ==========================================
// 1. DB 평면 데이터를 4단계 피라미드 구조로 변환
// ==========================================
const buildOrgTree = (deptList: IDept[]) => {
  const findDept = (dno: number) => deptList.find(d => d.dno === dno);
  
  const rootDept = findDept(10); // 대표이사실
  const vpDept = findDept(20);   // 부대표실
  const execDept = findDept(30); // 임원실
  
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
  onClick 
}: { 
  dept: { dname: string; dno?: number }; 
  isOpen: boolean;
  onClick: () => void;
}) => {
  const [employees, setEmployees] = useState<IEmp[]>([]); 
  const [loading, setLoading] = useState(false);

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
          padding: '10px 14px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          backgroundColor: 'transparent',
          color: '#4b5563',
          fontWeight: '500',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          userSelect: 'none'
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
              <div key={emp.eno} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
  setOpenDept
}: { 
  node: any; 
  isChild?: boolean; 
  isLong?: boolean;
  openDept: string;
  setOpenDept: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [employees, setEmployees] = useState<IEmp[]>([]); 
  const [loading, setLoading] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const isMultiple = hasChildren && node.children.length > 1;
  const upLineHeight = isLong ? 140 : 40;

  const isOpen = openDept === node.dname;

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
        const targetElement = document.getElementById(`admin-dept-card-${currentDno}`);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      }, 150);
    }
  }, [isOpen, node.dno, employees.length]);

  const handleBoxClick = () => {
    if (isOpen) {
      setOpenDept('');
    } else {
      setOpenDept(node.dname);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: isLong ? '120px' : (isChild && isMultiple ? '40px' : '20px') }}>
      <div 
        id={node.dno ? `admin-dept-card-${node.dno}` : undefined} 
        onClick={handleBoxClick} 
        style={{
          padding: '15px 20px',
          backgroundColor: '#e2e2e2', 
          borderRadius: '4px',
          textAlign: 'center',
          minWidth: '220px',
          zIndex: 2,
          fontSize: '13px',
          lineHeight: '1.6',
          position: 'relative',
          border: '1px solid #d1d5db', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer', 
          userSelect: 'none',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {isChild && (
          <div style={{ position: 'absolute', top: `-${upLineHeight}px`, left: '50%', width: '1px', height: `${upLineHeight}px`, backgroundColor: '#000', transform: 'translateX(-50%)' }} />
        )}
        <div style={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>
          {node.dname}
        </div>

        {isOpen && (
          <div style={{ fontSize: '13px', color: '#333', marginTop: '8px', borderTop: '1px solid #ccc', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            
            <div style={{ 
              fontSize: '11px', 
              color: '#4b5563', 
              backgroundColor: '#f3f4f6', 
              padding: '6px 8px', 
              borderRadius: '4px', 
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              border: '1px solid #e5e7eb'
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
                <div key={emp.eno} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ 
                    fontSize: '10px', 
                    backgroundColor: '#f3f4f6', 
                    padding: '1px 5px', 
                    borderRadius: '4px', 
                    color: '#4b5563',
                    fontWeight: 'bold',
                    lineHeight: '1.4'
                  }}>
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
                <OrgNode node={child} isChild={true} isLong={shouldBeLong} openDept={openDept} setOpenDept={setOpenDept} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. AdminPage 메인 컴포넌트
// ==========================================
function AdminPage() {
  const [activeTab, setActiveTab] = useState<'org' | 'board'>('org');
  const [openDept, setOpenDept] = useState('');
  const [treeData, setTreeData] = useState<any>(null); 
  const [sidebarDepts, setSidebarDepts] = useState<any[]>([]); 

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await deptService.getDeptList('', 0, 100);
        const filteredList = res.content.filter((d: any) => d.dname !== '전체');
        
        setSidebarDepts(filteredList);
        setTreeData(buildOrgTree(filteredList));
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      }
    };
    loadInitialData();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', backgroundColor: '#fff' }}>
      
      {/* --- 왼쪽 사이드바 영역 --- */}
      <aside style={{
        width: '300px',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e1e4e8',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <h3 style={{ fontSize: '18px', color: '#1E56A0', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>
          관리자 메뉴
        </h3>

        {/* 상위 대메뉴 선택 내비게이션 뷰 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div 
            onClick={() => setActiveTab('org')}
            style={{
              fontSize: '14px', 
              fontWeight: activeTab === 'org' ? '700' : '500', 
              color: activeTab === 'org' ? '#1E56A0' : '#4b5563', 
              cursor: 'pointer',
              padding: '6px 4px',
              borderRadius: '4px',
              backgroundColor: activeTab === 'org' ? '#eef2ff' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            - 조직도 관리
          </div>
          <div 
            onClick={() => setActiveTab('board')}
            style={{
              fontSize: '14px', 
              fontWeight: activeTab === 'board' ? '700' : '500', 
              color: activeTab === 'board' ? '#1E56A0' : '#4b5563', 
              cursor: 'pointer',
              padding: '6px 4px',
              borderRadius: '4px',
              backgroundColor: activeTab === 'board' ? '#eef2ff' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            - 게시판 관리
          </div>
        </div>
        
        {/* '조직도 관리' 메뉴 활성화 시 서브 메뉴 노출 */}
        {activeTab === 'org' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            
            {/* 🛠 [수정 포인트] 검색창을 없애고 그 자리에 버튼 2개 배치 */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => alert('부서 정보수정 기능 준비 중')}
                style={{
                  flex: 1,
                  padding: '10px 6px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                부서 정보수정
              </button>
              <button 
                onClick={() => alert('사원 정보수정 기능 준비 중')}
                style={{
                  flex: 1,
                  padding: '10px 6px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                사원 정보수정
              </button>
            </div>

            {/* 부서 리스트 목록 나열 */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sidebarDepts.map((dept, idx) => (
                  <SidebarItem 
                    key={dept.dno || idx}
                    dept={dept}
                    isOpen={openDept === dept.dname} 
                    onClick={() => setOpenDept(prev => prev === dept.dname ? '' : dept.dname)}
                  />
                ))}
              </div>
            </nav>
          </div>
        )}
      </aside>

      {/* --- 오른쪽 콘텐츠 본문 영역 --- */}
      <main style={{ 
        flex: 1, 
        padding: '80px 40px', 
        overflowX: 'auto', 
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
        {activeTab === 'org' ? (
          <div style={{ display: 'inline-flex', paddingLeft: '50px' }}>
            {treeData ? (
              <OrgNode node={treeData} openDept={openDept} setOpenDept={setOpenDept} />
            ) : (
              <div style={{ padding: '20px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '6px', border: '1px solid #ffeeba', fontSize: '15px', fontWeight: 'bold' }}>
                ⚠️ 데이터를 불러오는 중이거나 대표이사실을 찾을 수 없습니다.
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '40px', fontSize: '16px', color: '#4b5563', fontWeight: '600' }}>
            📋 게시판 관리 페이지가 준비 중입니다.
          </div>
        )}
      </main>

    </div>
  );
}

export default AdminPage;
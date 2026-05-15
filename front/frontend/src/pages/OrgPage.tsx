import React, { useState } from 'react';

// 1. 데이터 구조 (동일)
const orgData = {
  office: "대표이사실",
  detail: "대표: 이재용 / 비서: 유지민",
  children: [{
    office: "부대표실",
    detail: "부대표: 이상혁 / 비서: 김민정",
    children: [{
      office: "임원실",
      detail: "경영진 / 상무: 류지환 / 본부장: 이상미 / 운영책임자: 오준혁",
      children: [
        { office: "데이터팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "보안팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "개발팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "마케팅팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "디자인팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "인사팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
        { office: "QA팀", detail: "팀장: 류지환 / 부장: 이상미 / 사원: 오준혁" },
      ]
    }]
  }]
};

const OrgNode = ({ node, isChild = false, isLong = false }: { node: any; isChild?: boolean; isLong?: boolean }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isMultiple = hasChildren && node.children.length > 1;
  const upLineHeight = isLong ? 140 : 40;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      position: 'relative',
      marginTop: isLong ? '120px' : (isChild && isMultiple ? '40px' : '20px')
    }}>
      <div style={{
        padding: '15px 20px',
        backgroundColor: '#e2e2e2', 
        borderRadius: '4px',
        textAlign: 'center',
        minWidth: '200px',
        zIndex: 2,
        fontSize: '13px',
        lineHeight: '1.6',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {isChild && (
          <div style={{
            position: 'absolute',
            top: `-${upLineHeight}px`,
            left: '50%',
            width: '1px',
            height: `${upLineHeight}px`,
            backgroundColor: '#000',
            transform: 'translateX(-50%)',
          }} />
        )}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '14px' }}>
          {node.office}
        </div>
        <div style={{ fontSize: '11px', color: '#333' }}>
          {node.detail?.split('/').map((info: string, idx: number) => (
            <div key={idx} style={{ marginTop: '2px' }}>{info.trim()}</div>
          ))}
        </div>
      </div>

      {hasChildren && (
        <div style={{ display: 'flex', position: 'relative', paddingTop: isMultiple ? '40px' : '60px' }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '1px',
            height: isMultiple ? '20px' : '60px', 
            backgroundColor: '#000',
            transform: 'translateX(-50%)',
          }} />
          {isMultiple && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: `${100 / (node.children.length * 2)}%`,
              right: `${100 / (node.children.length * 2)}%`,
              height: '1px',
              backgroundColor: '#000',
            }} />
          )}
          {node.children.map((child: any, idx: number) => {
            const shouldBeLong = idx === 1 || idx === 3 || idx === 5;
            return (
              <div key={idx} style={{ position: 'relative', padding: '0 10px' }}>
                <OrgNode node={child} isChild={true} isLong={shouldBeLong} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const OrgPage = () => {
  const [selectedDept, setSelectedDept] = useState('전체');
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 검색 상태 추가
  const departments = ['전체', '경영지원팀', '개발본부', '디자인팀', '마케팅팀', '데이터팀', '보안팀', '인사팀', 'QA팀'];

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
        gap: '20px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          color: '#1E56A0', 
          fontWeight: '700', 
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          사원 / 부서 검색
        </h3>
        
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input 
            type="text" 
            placeholder="부서 또는 사원 검색" 
            value={searchTerm} // 👈 상태 연결
            onChange={(e) => setSearchTerm(e.target.value)} // 👈 값 변경 연결
            style={{
              width: '250px',
              padding: '11px 12px 11px 38px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              fontSize: '14px',
              color: '#111827',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#1E56A0';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30, 86, 160, 0.1)';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }}
          />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {departments
            .filter(dept => dept.includes(searchTerm)) // 👈 필터링 적용
            .map(dept => (
              <div 
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  backgroundColor: selectedDept === dept ? '#eef2ff' : 'transparent',
                  color: selectedDept === dept ? '#1E56A0' : '#4b5563',
                  fontWeight: selectedDept === dept ? '700' : '500',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ opacity: selectedDept === dept ? 1 : 0.6 }}>📁</span>
                {dept}
              </div>
          ))}
          {/* 검색 결과가 없을 때 안내 */}
          {departments.filter(dept => dept.includes(searchTerm)).length === 0 && (
            <div style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginTop: '10px' }}>
              검색 결과가 없습니다.
            </div>
          )}
        </nav>
      </aside>

      <main style={{ 
        flex: 1, 
        padding: '80px 40px', 
        overflowX: 'auto', 
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'inline-flex', paddingLeft: '50px' }}>
          <OrgNode node={orgData} />
        </div>
      </main>

    </div>
  );
};

export default OrgPage;
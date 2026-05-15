
const Header = () => {
  return (
    <header className="w-full bg-[#003366] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 영역 */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-[#003366] rounded flex items-center justify-center font-bold">
            K
          </div>
          <span className="text-xl font-bold tracking-tight">KSYS INTERNAL</span>
        </div>

        {/* 메인 메뉴 */}
        <nav className="flex items-center gap-8">
          <a href="#org" className="hover:text-blue-200 transition-colors font-medium">조직도</a>
          <a href="#board" className="hover:text-blue-200 transition-colors font-medium">게시판</a>
          <a href="#admin" className="hover:text-blue-200 transition-colors font-medium">관리</a>
        </nav>

        {/* 사용자 정보 영역 */}
        <div className="flex items-center gap-3 border-l border-blue-800 pl-6">
          <div className="text-right">
            <p className="text-xs text-blue-300">ADMIN</p>
            <p className="text-sm font-semibold">홍길동 님</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400">
            <span className="text-sm">홍</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
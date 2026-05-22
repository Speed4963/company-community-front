import React, { createContext, useContext, useState } from 'react';

interface User {
  eno: string;
  name: string;
}

const UserContext = createContext<{ user: User | null; setUser: (u: User | null) => void } | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ eno: 'user01', name: '홍길동' }); // 초기값으로 테스트 계정 설정
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
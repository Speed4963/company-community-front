import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  eno: string;
  name: string;
}

const UserContext = createContext<{ user: User | null; setUser: (u: User | null) => void } | undefined>(undefined);

// src/context/UserContext.tsx
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // user가 바뀔 때마다 세션스토리지를 동기화
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
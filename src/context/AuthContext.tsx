import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  signed: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  function login(selectedUser: User) {
    setUser(selectedUser);
  }

  function logout() {
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{
      user,
      signed: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}
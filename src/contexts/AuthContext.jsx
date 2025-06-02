import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, removeToken } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token válido ao carregar a aplicação
    const checkAuth = () => {
      if (isAuthenticated()) {
        // Aqui você pode fazer uma requisição para obter dados do usuário
        // Por enquanto, vamos apenas definir que o usuário está logado
        setUser({ authenticated: true });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

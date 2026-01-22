import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: Math.random(),
            email,
            name: email.split("@")[0],
            orders: [],
          };
          setUser(userData);
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  const register = (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Math.random(),
            email,
            name,
            orders: [],
          };
          setUser(userData);
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error("Invalid input"));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order) => {
    setUser((prev) => ({
      ...prev,
      orders: [...(prev.orders || []), order],
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        addOrder,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

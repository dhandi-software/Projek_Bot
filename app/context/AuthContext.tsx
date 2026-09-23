import React, { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import { authService } from "~/services/authService";
import type { User, LoginCredentials, RegisterCredentials } from "~/types/auth";
import { useNavigate, useLocation } from "react-router";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  loginCustomer: (data: LoginCredentials) => Promise<void>;
  registerCustomer: (data: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("user");
      
      if (savedUser) {
        try {
            setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse user", error);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const handleAuthSuccess = (userData: User) => {
    const oldUserStr = localStorage.getItem("user");
    if (oldUserStr) {
      try {
        const oldUser = JSON.parse(oldUserStr);
        if (oldUser.email !== userData.email || oldUser.id !== userData.id) {
          localStorage.removeItem("userPhoto");
          localStorage.removeItem("userProfile");
          localStorage.removeItem("userUsername");
          localStorage.removeItem("userBio");
        }
      } catch (e) {
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("userProfile");
      }
    }
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    const from = (location.state as any)?.from?.pathname || null;

    if (from) {
      navigate(from, { replace: true });
    } else {
      const role = (userData.role || 'customer').toLowerCase();
      if (role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const login = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
        const payload = {
            username: data.email || data.username,
            password: data.password
        };

      const response = await authService.login(payload);
      if (response.user) {
        handleAuthSuccess(response.user);
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginCustomer = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.loginCustomer(data);
      if (response.user) {
        handleAuthSuccess({ ...response.user, role: 'customer' });
      }
    } catch (error) {
      console.error("Customer login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerCustomer = async (data: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.registerCustomer(data);
      if (response.user) {
        handleAuthSuccess({ ...response.user, role: 'customer' });
      }
    } catch (error) {
      console.error("Customer registration failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userBio");
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("lastPasswordUpdate");
    
    try {
      authService.logout().catch(e => console.error(e));
    } catch(e) { console.error(e) }

    setUser(null);
    window.location.href = "/login";
  };

  const value = React.useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginCustomer,
    registerCustomer,
    logout
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

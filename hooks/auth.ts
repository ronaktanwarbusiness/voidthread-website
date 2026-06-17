import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSession = async () => {
    setLoading(true);
    try {
      const response = await apiClient<any>("/api/v1/auth/session");
      if (response.is_logged_in) {
        setUser(response.user);
      } else {
        setUser(null);
      }
      return response;
    } catch (err: any) {
      setUser(null);
      // Don't throw error here to avoid breaking initial load
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient<any>("/api/v1/auth/login", {
        method: "POST",
        body: data,
      });
      await getSession(); // Refresh session after login
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient<any>("/api/v1/auth/register", {
        method: "POST",
        body: data,
      });
      await getSession(); // Refresh session after register
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiClient("/api/v1/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient<any>("/api/v1/user/update", {
        method: "PATCH",
        body: data,
      });
      await getSession();
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    error,
    refreshSession: getSession,
  };
};

import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rightsApi } from "../api/rightsApi";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [userRights, setUserRights] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const publicRoutes = ["/admin/forget-password", "/admin/login"];

  const checkAuth = useCallback(async () => {
    if (publicRoutes.includes(location.pathname) == true) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setIsAuthenticated(false);
        setUserData(null);
        navigate(data.redirectUrl);
      } else {
        const data = await res.json();
        setUserData(data.userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname]);

  // ✅ Check auth when component mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { userData, userRights, isLoading, isAuthenticated, checkAuth };
};

export default useAuthCheck;

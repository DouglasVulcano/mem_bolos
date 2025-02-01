import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
  const { user, isAuthenticated, checkAuthState } = useAuthStore();

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  return { user, isAuthenticated };
}

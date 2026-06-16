import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../app/store/index.js";
import apiClient from "../../../shared/lib/axios.js";
import { ADMIN_SESSION_RESTORE_KEY } from "../admin/api/adminAuthApi.js";

export const AuthSessionGate = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      if (isAuthenticated) {
        return;
      }

      const shouldRestore =
        window.sessionStorage.getItem(ADMIN_SESSION_RESTORE_KEY) === "1";

      if (!shouldRestore) {
        return;
      }

      try {
        const response = await apiClient.get("/auth/me");
        const user = response.data?.data;

        if (isMounted && user?.role) {
          window.sessionStorage.removeItem(ADMIN_SESSION_RESTORE_KEY);
          dispatch(login({ user }));
        }
      } catch {
        window.sessionStorage.removeItem(ADMIN_SESSION_RESTORE_KEY);
        // A missing/expired cookie is a normal logged-out state.
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

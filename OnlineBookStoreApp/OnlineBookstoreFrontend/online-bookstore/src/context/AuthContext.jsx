import { useCallback, useEffect, useRef, useState } from "react";
<<<<<<< HEAD
=======
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
import keycloak from "../auth/keycloak";
import { AuthContext } from "./authContext";

let keycloakInitPromise;

function initKeycloak() {
  if (!keycloakInitPromise) {
    keycloakInitPromise = keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
      checkLoginIframe: false,
    });
  }

  return keycloakInitPromise;
}

<<<<<<< HEAD
=======
// Helper to map role to dashboard path
export const getDashboardPath = (roles) => {
  if (roles.includes("ROLE_ADMIN")) return "/admin";
  if (roles.includes("ROLE_STORE_ADMIN")) return "/store";
  if (roles.includes("ROLE_WORKER") || roles.includes("ROLE_EMPLOYEE")) return "/employee";
  if (roles.includes("ROLE_USER")) return "/dashboard";
  return "/";
};

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef(null);
<<<<<<< HEAD
=======
  const hasRedirectedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect ONLY ONCE after initial login, then allow free navigation
    if (!loading && user && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      const targetPath = getDashboardPath(user.roles);
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate(targetPath);
      }
    }
  }, [user, loading]);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

  useEffect(() => {
    let mounted = true;

    initKeycloak()
      .then((authenticated) => {
        if (!mounted) return;

        if (authenticated) {
          const profile = keycloak.tokenParsed;

          const roles = profile?.realm_access?.roles || [];

          const userData = {
            id: profile.sub,
            name: profile.name || profile.preferred_username,
            email: profile.email,
            roles,
          };

          setUser(userData);
          setToken(keycloak.token);
          localStorage.setItem("token", keycloak.token);

          // prevent multiple intervals
          if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
          }

          refreshIntervalRef.current = setInterval(() => {
            keycloak.updateToken(60).then((refreshed) => {
              if (refreshed) {
                setToken(keycloak.token);
                localStorage.setItem("token", keycloak.token);
              }
            });
          }, 30000);
        } else {
          // IMPORTANT: clear user explicitly
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error("Keycloak initialization failed", error);

        if (mounted) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const login = useCallback(async () => {
    try {
      await initKeycloak();
      await keycloak.login({ redirectUri: window.location.href });
    } catch (error) {
      console.error("Keycloak login failed", error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    keycloak.logout({ redirectUri: window.location.origin });
  }, []);

  const hasRole = useCallback((role) => user?.roles?.includes(role), [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
<<<<<<< HEAD
=======


>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

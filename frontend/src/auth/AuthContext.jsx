import { createContext, useContext, useEffect, useState } from "react";
import * as cognito from "./cognito.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cognito
      .getSession()
      .then((session) => setUser({ email: session.getIdToken().payload.email }))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const session = await cognito.signIn(email, password);
    setUser({ email: session.getIdToken().payload.email });
  };

  const logout = () => {
    cognito.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register: cognito.signUp,
    confirm: cognito.confirmSignUp,
    resendCode: cognito.resendCode,
    getAccessToken: cognito.getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
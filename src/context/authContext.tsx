import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const isAuthenticated = !!accessToken;

  const login = async (email: string, password: string) => {
    const response = await fetch("http://127.0.0.1:3001/api/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const headers = response.headers;
      // ver aca hay problemas con el tipo de la variable token, le puse any y se soluciono, pero verificar.
      const token: any = headers.get("access-token");
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
    } else {
      throw new Error("Failed to login");
    }
    console.log("firing login");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

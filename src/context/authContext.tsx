import { createContext, useContext, useState } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | null;
  client: string | null;
  uid: string | null;
  userName: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  accessToken: null,
  client: null,
  uid: null,
  userName: null,
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
  const [client, setClient] = useState<string | null>(
    localStorage.getItem("client")
  );
  const [uid, setUid] = useState<string | null>(localStorage.getItem("uid"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(accessToken !== null)
  );
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const headers = {
          token: response.headers.get("access-token"),
          uid: response.headers.get("uid"),
          client: response.headers.get("client"),
          userName: response.headers.get("name"),
        };

        if (
          headers.token &&
          headers.uid &&
          headers.client &&
          headers.userName
        ) {
          localStorage.setItem("accessToken", headers.token);
          localStorage.setItem("uid", headers.uid);
          localStorage.setItem("client", headers.client);
          localStorage.setItem("userName", headers.userName);
          setAccessToken(headers.token);
          setUid(headers.uid);
          setClient(headers.client);
          setUserName(headers.userName);
          setIsAuthenticated(true);
        }
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Error logging in", error);
      throw new Error("Failed to login");
    }
  };

  const logout = async () => {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (accessToken && client && uid) {
        headers["access-token"] = accessToken;
        headers["client"] = client;
        headers["uid"] = uid;
      }

      const response = await fetch("http://127.0.0.1:3001/api/auth/sign_out", {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        localStorage.clear();
        setAccessToken(null);
        setUid(null);
        setClient(null);
        setIsAuthenticated(false);
      } else {
        console.error("Error en el cierre de sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        accessToken,
        client,
        uid,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

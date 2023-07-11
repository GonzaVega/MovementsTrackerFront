import { AuthContextProps } from "../../context/authContext";

export interface UserModel {
  email: string;
  name: string;
  unit_id: number;
  password: string;
  password_confirmation: string;
}

export async function register(user: UserModel, AuthContext: AuthContextProps) {
  const response = await fetch("http://localhost:3001/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const headers = {
      token: response.headers.get("access-token"),
      uid: response.headers.get("uid"),
      client: response.headers.get("client"),
    };

    if (headers.token) {
      localStorage.setItem("accessToken", headers.token);
      AuthContext.accessToken = headers.token;
      AuthContext.uid = headers.uid;
      AuthContext.client = headers.client;
      AuthContext.isAuthenticated = true;
    }
  }
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
}

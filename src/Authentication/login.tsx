import { useAuth, AuthProvider } from "../context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (isAuthenticated) {
        history("/");
        console.log("login working");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        {" "}
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

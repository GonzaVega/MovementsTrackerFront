import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login, setIsAuthenticated } = useAuth();
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (isAuthenticated) {
        setIsAuthenticated(true);
        // history("/");
      }
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      console.error(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <h2>Login</h2>
      {error && <h3 className="errortxt">{error}</h3>}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
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

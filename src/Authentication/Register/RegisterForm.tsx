import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, UserModel } from "./userService";

// interface RegisterFormProps {
//   onSubmit: (
//     email: string,
//     password: string,
//     name: string,
//     unitId: number | undefined
//   ) => void;
// }

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [unitId, setUnitId] = useState(0);

  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // onSubmit(email, password, name, unitId);
    const registerFormData: UserModel = {
      email: email,
      name: name,
      unit_id: unitId,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    if (registerFormData.password === registerFormData.password_confirmation) {
      register(registerFormData);
      console.log(typeof unitId);
      history("/");
    } else {
      alert("The password confirmation has failed! please try again");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your E-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Enter your password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Password Confirmation:</label>
          <input
            placeholder="Confirm your entered password"
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Enter your name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="unitId">Unit ID:</label>
          <input
            placeholder="Enter your unit"
            type="number"
            id="unitId"
            value={unitId ? unitId : ""}
            onChange={(e) => setUnitId(parseInt(e.target.value))}
            required
          />
        </div>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

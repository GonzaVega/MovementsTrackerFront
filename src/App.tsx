import React, { useState, useContext, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { isTemplateSpan } from "typescript";
import ItemInfo from "./testComponents/ItemInfo";
import NavBar from "./NavBar/NavBar";
import MovementsRoute from "./Routes/MovementsRoute";
import UsersRoute from "./Routes/UsersRoute";
import UnitsRoute from "./Routes/UnitsRoute";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpense from "./IncomeExpense";
import TransactionList from "./TransactionList";
import NewMovement from "./Movements/Movement/NewMovement";
import UserNavbar from "./NavBar/UserNavbar";
import { MovementsProvider } from "./context/context";
import { BalanceProvider } from "./context/balanceContext";
import { useAuth } from "./context/authContext";
import { Login } from "./Authentication/Login";
import RegisterForm from "./Authentication/Register/RegisterForm";
import RegistrationModal from "./Authentication/Register/RegistrationModal";
import SuccessfulRegistrationRoute from "./Routes/SuccessfulRegistrationRoute";
import Logout from "./Authentication/Logout";
import { ModalContext, ModalProvider } from "./context/modalContext";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  unit_id: string;
  created_at: string;
  updated_at: string;
  url: string;
}

function App() {
  const { isAuthenticated, accessToken } = useAuth();
  const { closeModal } = useContext(ModalContext);

  const handleIsLoggedIn = (event: any) => {
    event.preventDefault();
  };

  let appRendering;
  if (isAuthenticated) {
    appRendering = (
      <div className="App">
        <div className="container">
          <Logout />
          <MovementsProvider>
            <BalanceProvider>
              <Balance />
              <IncomeExpense />
              <TransactionList />
              <UserNavbar />
              <NewMovement />
            </BalanceProvider>
          </MovementsProvider>
          <div>
            <Routes>
              {/* <Route path="*" element={<App />} /> */}
              <Route path="/Movements" element={<MovementsRoute />} />
              <Route path="/Users" element={<UsersRoute />} />
              <Route path="/Units" element={<UnitsRoute />} />
              <Route
                path="/successfulregistration"
                element={<SuccessfulRegistrationRoute />}
              />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    appRendering = (
      <div className="App">
        <NavBar />
        <Login />

        <RegisterForm />

        <Routes>
          <Route
            path="/successfulregistration"
            element={<SuccessfulRegistrationRoute />}
          />
        </Routes>
      </div>
    );
  }

  return appRendering;
}
export default App;

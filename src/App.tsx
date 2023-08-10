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
import NewUnit from "./Units/Unit/NewUnit";
import NewUnitType from "./UnitTypes/UnitType/NewUnitType";
import UserNavbar from "./NavBar/UserNavbar";
import { MovementsProvider } from "./context/context";
import { BalanceProvider } from "./context/balanceContext";
import { useAuth } from "./context/authContext";
import { Login } from "./Authentication/Login";
import { UsersProvider } from "./context/usersContext";
import { UnitsProvider } from "./context/unitsContext";
import RegisterForm from "./Authentication/Register/RegisterForm";
import RegistrationModal from "./Authentication/Register/RegistrationModal";
import SuccessfulRegistrationRoute from "./Routes/SuccessfulRegistrationRoute";
import Logout from "./Authentication/Logout";
import Modal from "./Modal/Modal";
import logo from "./Shared Resources/Logo Movements Tracker.png";
import { UnitTypesProvider } from "./context/unitTypeContext";

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
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [userOption, setUserOption] = useState<boolean>(true);

  const handleNewUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUserOption(false);
    setIsNewUser(true);
  };

  const handleNotRegister = () => {
    setUserOption(true);
    setIsNewUser(false);
  };

  let appRendering;
  if (isAuthenticated) {
    appRendering = (
      <div className="App">
        <div className="logo-container">
          <Logout />
          <img src={logo} alt="Logo Movements Tracker" />
          <div className="header-container">
            <Header />
          </div>
        </div>
        <div className="container">
          <MovementsProvider>
            <BalanceProvider>
              <div className="balance-container">
                <Balance />
              </div>
              <IncomeExpense />
              <TransactionList />
              <UsersProvider>
                <UnitTypesProvider>
                  <UnitsProvider>
                    <div className="new-items-container">
                      <NewMovement />
                      <NewUnit />
                      <NewUnitType />
                    </div>
                    <UserNavbar />
                  </UnitsProvider>
                </UnitTypesProvider>
              </UsersProvider>
            </BalanceProvider>
          </MovementsProvider>
          <div>
            <Routes>
              {/* <Route path="*" element={<App />} /> */}
              <Route path="/Movements" element={<MovementsRoute />} />
              <Route path="/Users" element={<UsersRoute />} />
              <Route path="/Units" element={<UnitsRoute />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    appRendering = (
      <div>
        <img src={logo} alt="Logo Movements Tracker" />
        <h2 className="welcome-txt">Welcome to Movements Tracker</h2>
        <div className="App">
          <NavBar />
          <Login />
          {userOption && (
            <button className="btn-ok" onClick={handleNewUser}>
              Not a member? Create new user
            </button>
          )}
          <Routes>
            <Route
              path="/successfulregistration"
              element={<SuccessfulRegistrationRoute />}
            />
          </Routes>
          {isNewUser && <Modal restoreAppState={handleNotRegister} />}
        </div>
      </div>
    );
  }

  return appRendering;
}
export default App;

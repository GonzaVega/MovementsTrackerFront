import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
  const [testData, setTestData] = useState<User[]>([]);

  const fetchUserHandler = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/users.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      setTestData(data);
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(testData);
  };

  // manejar logica de inicio de sesion aca con componentes condicionales.

  return (
    <div className="App">
      <NavBar />
      <Header />
      <div className="container">
        <MovementsProvider>
          <BalanceProvider>
            <Balance />
            <IncomeExpense />
            <TransactionList />
            <UserNavbar />
            <NewMovement />
          </BalanceProvider>
        </MovementsProvider>
      </div>
      <div>
        <Routes>
          <Route path="/Movements" element={<MovementsRoute />} />
          <Route path="/Users" element={<UsersRoute />} />
          <Route path="/Units" element={<UnitsRoute />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useAuth } from "./context/authContext";

const IncomeExpense = () => {
  const [totalExpenses, setTotalExpenses] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const { accessToken, client, uid } = useAuth();

  const fetchExpensesIncome = async () => {
    try {
      const expenseResponse = await fetch(
        "http://127.0.0.1:3001/api/movements/expense_balance.json",
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken!,
            uid: uid!,
            client: client!,
          },
        }
      );
      if (!expenseResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await expenseResponse.json();
      setTotalExpenses(data.expense_balance);
    } catch (error: any) {
      console.log(error.message);
    }
    try {
      const incomeResponse = await fetch(
        "http://127.0.0.1:3001/api/movements/income_balance.json",
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken!,
            uid: uid!,
            client: client!,
          },
        }
      );
      if (!incomeResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await incomeResponse.json();
      setTotalIncome(data.income_balance);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpensesIncome();
  }, []);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          +${totalIncome}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
          -${totalExpenses}
        </p>
      </div>
    </div>
  );
};
export default IncomeExpense;

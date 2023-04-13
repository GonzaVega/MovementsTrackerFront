import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchFunction } from "../helpers/fetch";
export const BalanceContext = createContext<number>(0);

export const BalanceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/movements/balance.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setBalance(data.balance);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const value = balance;

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
};

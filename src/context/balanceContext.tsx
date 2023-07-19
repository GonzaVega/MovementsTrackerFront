import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useAuth } from "./authContext";
import { MovementsContext } from "./context";

export const BalanceContext = createContext<number>(0);

export const BalanceProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(0);
  const { accessToken, client, uid } = useAuth();
  const { deleteMovement, movements } = useContext(MovementsContext);
  const fetchBalance = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/movements/balance.json",
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken!,
            uid: uid!,
            client: client!,
          },
        }
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

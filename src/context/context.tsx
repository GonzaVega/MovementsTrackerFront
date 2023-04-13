import React, { createContext, useEffect, useState, ReactNode } from "react";

type Movement = {
  id: number;
  amount: number;
  concept: number | string;
  description: string;
  date: Date;
  unit_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

type MovementsContextValue = {
  movements: Movement[];
  deleteMovement: (id: number) => Promise<void>;
};

export const MovementsContext = createContext<MovementsContextValue>({
  movements: [],
  deleteMovement: async () => {},
});
export const MovementsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const fetchMovements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/movements.json");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setMovements(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const deleteMovement = async (id: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/movements/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setMovements((prevMovements) =>
        prevMovements.filter((movement) => movement.id !== id)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const value: MovementsContextValue = { movements, deleteMovement };

  return (
    <MovementsContext.Provider value={value}>
      {children}
    </MovementsContext.Provider>
  );
};

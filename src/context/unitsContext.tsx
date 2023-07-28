import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

export interface Unit {
  id: number | null;
  name: string;
  address: string;
  // Otras propiedades relevantes de la unidad
}

export interface UnitsContextProps {
  units: Unit[];
}

export const UnitsContext = createContext<UnitsContextProps>({
  units: [],
});

export const useUnitsContext = () => useContext(UnitsContext);

export const UnitsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const { accessToken, client, uid } = useAuth();

  const unitsData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/units.json", {
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken!,
          uid: uid!,
          client: client!,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const itemOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
        address: item.address,
      }));
      setUnits(itemOptions);
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  };
  useEffect(() => {
    unitsData();
  }, []);
  return (
    <UnitsContext.Provider value={{ units }}>{children}</UnitsContext.Provider>
  );
};

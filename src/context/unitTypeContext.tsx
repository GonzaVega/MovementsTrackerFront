import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

export interface UnitType {
  id: number | null;
  name: string;
}

export interface UnitTypesContextProps {
  unitTypes: UnitType[];
}

export const UnitTypesContext = createContext<UnitTypesContextProps>({
  unitTypes: [],
});

export const useUnitTypesContext = () => useContext(UnitTypesContext);

export const UnitTypesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([]);
  const { accessToken, client, uid } = useAuth();

  const unitTypesData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/unit_types.json",
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

      const itemOptions = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      setUnitTypes(itemOptions);
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  };
  useEffect(() => {
    unitTypesData();
  }, []);
  return (
    <UnitTypesContext.Provider value={{ unitTypes }}>
      {children}
    </UnitTypesContext.Provider>
  );
};

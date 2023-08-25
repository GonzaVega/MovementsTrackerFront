import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

interface UnitType {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
  users: any;
  address: string;
  unit_type: UnitType;
  movements: Object[];
}

interface UserUnitsContextType {
  userUnits: Unit[];
}

const UserUnitsContext = createContext<UserUnitsContextType | undefined>(
  undefined
);

export const UserUnitsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [userUnits, setUserUnits] = useState<Unit[]>([]);
  const { accessToken, client, uid } = useAuth();

  useEffect(() => {
    // Llamada al backend para obtener las unidades del usuario
    // Incluye el token del usuario en la llamada
    fetch("http://localhost:3001/api/units/user_units", {
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken!,
        uid: uid!,
        client: client!,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserUnits(data))
      .catch((error) => console.error("Error fetching user units:", error));
  }, []);

  return (
    <UserUnitsContext.Provider value={{ userUnits }}>
      {children}
    </UserUnitsContext.Provider>
  );
};

export const useUserUnits = () => {
  const context = useContext(UserUnitsContext);
  if (!context) {
    throw new Error("useUserUnits must be used within a UserUnitsProvider");
  }
  return context;
};

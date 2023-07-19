import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

export interface User {
  id: number | null;
  email: string;
  name: string;
  unit_id: number | null;
  created_at: string;
  updated_at: string;
  password: string | null;
  provider: string;
  uid: string;
  value?: string;
  label?: string;
}

export interface UsersContextProps {
  users: User[];
}

export const UsersContext = createContext<UsersContextProps>({
  users: [] as User[],
});

export const useUsersContext = () => useContext(UsersContext);

export const UsersProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const { accessToken, client, uid } = useAuth();

  const usersData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users.json", {
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
      }));
      setUsers(itemOptions);
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  };
  useEffect(() => {
    usersData();
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
};

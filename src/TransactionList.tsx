import React, { useContext } from "react";
import { MovementsContext } from "./context/context";

const TransactionList = () => {
  const { movements, deleteMovement } = useContext(MovementsContext);

  const handleDelete =
    (id: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await deleteMovement(id);
    };
  return (
    <>
      <h3>History</h3>
      {movements.map((item: any) => (
        <ul id="list" className="list" key={item.id}>
          <li className={item.concept === "income" ? "plus" : "minus"}>
            <button className="delete-btn" onClick={handleDelete(item.id)}>
              x
            </button>
            {item.description}{" "}
            <span>
              {item.concept === "income" ? item.amount : "-" + item.amount}
            </span>
          </li>
        </ul>
      ))}
    </>
  );
};
export default TransactionList;

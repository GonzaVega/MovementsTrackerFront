import React, { useState, useContext } from "react";
import { MovementsContext } from "../context/context";
import "./TransactionList.css";
import { useAuth } from "../context/authContext";

const TransactionList = () => {
  const { movements, deleteMovement } = useContext(MovementsContext);
  const { userName } = useAuth();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await deleteMovement(id);
  };

  const toggleExpansion = (id: number) => () => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="transaction-list">
      <h3>{`${userName}'s `}Movements</h3>
      {movements.map((item: any) => (
        <ul
          className={`transaction-item ${
            expandedId === item.id ? "expanded" : ""
          }`}
          key={item.id}
          style={{
            borderRight:
              item.concept === "income"
                ? "5px solid #2ecc71"
                : "5px solid #c0392b",
          }}
        >
          <button
            className="delete-button"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(item.id);
            }}
          >
            x
          </button>
          <div className="transaction-info" onClick={toggleExpansion(item.id)}>
            <div
              className={`main-info ${
                expandedId === item.id ? "expanded" : ""
              }`}
            >
              {item.description}
              <span>|{item.unit_name}|</span>
              <span className="transaction-amount">
                <p>
                  {item.concept === "income"
                    ? `$ ${item.amount}`
                    : `-$ ${item.amount}`}
                </p>
              </span>
            </div>
            {expandedId === item.id && (
              <div className="additional-info">
                <div className="date-user">
                  <span>
                    Date:
                    <b>
                      {` ${new Date(item.date).toLocaleDateString()},
                      ${new Date(item.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} `}
                    </b>
                    hs.
                  </span>
                  <span>
                    Movement created by: <b>{item.user_name}</b>
                  </span>
                </div>
              </div>
            )}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default TransactionList;

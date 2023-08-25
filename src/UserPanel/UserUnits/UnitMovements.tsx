import React, { useState } from "react";

interface UnitMovementsProps {
  movements: {
    id: number;
    description: string;
    user: {
      name: string;
    };
    concept: number;
    amount: number;
    date: string;
  }[];
}

const UnitMovements: React.FC<UnitMovementsProps> = ({ movements }) => {
  const [expandedMovementId, setExpandedMovementId] = useState<number | null>(
    null
  );

  const handleToggleExpansionMovement = (itemId: number) => {
    if (itemId === expandedMovementId) {
      setExpandedMovementId(null);
    } else {
      setExpandedMovementId(itemId);
    }
  };

  return (
    <div className="transaction-list">
      {movements.map((item: any) => (
        <ul
          className={`transaction-item ${
            expandedMovementId === item.id ? "expanded" : ""
          }`}
          key={item.id}
          style={{
            borderRight:
              item.concept === 1 ? "5px solid #2ecc71" : "5px solid #c0392b",
          }}
        >
          <div
            className="transaction-info"
            onClick={() => handleToggleExpansionMovement(item.id)}
          >
            <div
              className={`main-info ${
                expandedMovementId === item.id ? "expanded" : ""
              }`}
            >
              <p>
                <b>{item.description}</b> ({item.user.name})
              </p>
              <span className="transaction-amount">
                {item.concept === 1 ? `$ ${item.amount}` : `-$ ${item.amount}`}
              </span>
            </div>
            {expandedMovementId === item.id && (
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
                </div>
              </div>
            )}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default UnitMovements;

import React, { useState } from "react";

import UnitMovements from "./UnitMovements";

interface UserUnitItemProps {
  unit: {
    id: number;
    name: string;
    address: string;
    unit_type: {
      name: string;
    };
    users: {
      name: string;
    }[];
    movements: any;
  };
}

const UserUnitItem: React.FC<UserUnitItemProps> = ({ unit }) => {
  const [expandedUnit, setExpandedUnit] = useState(false);
  const [showMovements, setShowMovements] = useState(false);

  const handleToggleExpansion = () => {
    setExpandedUnit(!expandedUnit);
    setShowMovements(false);
  };

  const handleToggleShowMovements = () => {
    setShowMovements(!showMovements);
  };

  const formatUserList = (userList: string[]): string => {
    if (userList.length <= 0) {
      return "";
    } else if (userList.length === 1) {
      return userList[0];
    } else if (userList.length === 2) {
      return `${userList[0]} and ${userList[1]}`;
    } else {
      const commaSeparated = userList.slice(0, -1).join(", ");
      return `${commaSeparated}, and ${userList[userList.length - 1]}`;
    }
  };

  return (
    <ul className={`unit-item ${expandedUnit ? "expanded" : ""}`}>
      <div className="unit-info">
        <div
          className={`main-info-unit ${expandedUnit ? "expanded-unit" : ""}`}
          onClick={handleToggleExpansion}
        >
          <strong>{unit.name}</strong>
          <p>
            Address: <b>{` ${unit.address}.`}</b>
          </p>
          <p>Type: {unit.unit_type.name}</p>
        </div>
        {expandedUnit && (
          <div className="additional-info-unit">
            <div className="user-partners">
              <p>
                Unit partners:{" "}
                <b>{` ${formatUserList(
                  unit.users.map((user: any) => user.name)
                )}.`}</b>
              </p>
            </div>
            {!showMovements ? (
              <button
                className="btn-show-movement"
                onClick={handleToggleShowMovements}
              >
                Show Movements
              </button>
            ) : (
              <button
                className="btn-hide-movement"
                onClick={handleToggleShowMovements}
              >
                Hide Movements
              </button>
            )}

            {showMovements && <UnitMovements movements={unit.movements} />}
          </div>
        )}
      </div>
    </ul>
  );
};

export default UserUnitItem;

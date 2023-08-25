// import React, { useState } from "react";
// import "./UserUnits.css";
// import { useUserUnits } from "../../context/userUnitsContext";
// import { useAuth } from "../../context/authContext";

// const UserUnits: React.FC = () => {
//   const { userUnits } = useUserUnits();
//   const [expandedUnitId, setExpandedUnitId] = useState<number | null>(null);
//   const [showMovements, setShowMovements] = useState<number | null>(null);
//   const [expandedMovementId, setExpandedMovementId] = useState<number | null>(
//     null
//   );
//   const { userName } = useAuth();
//   const handleToggleExpansion = (itemId: number) => {
//     if (itemId === expandedUnitId) {
//       setExpandedUnitId(null);
//     } else {
//       setExpandedUnitId(itemId);
//       setShowMovements(null);
//     }
//   };

//   const handleToggleShowMovements = (itemId: number) => {
//     if (itemId === showMovements) {
//       setShowMovements(null);
//     } else {
//       setShowMovements(itemId);
//     }
//   };

//   const handleToggleExpansionMovement = (itemId: number) => {
//     if (itemId === expandedMovementId) {
//       setExpandedMovementId(null);
//     } else {
//       setExpandedMovementId(itemId);
//     }
//   };
//   const formatUserList = (userList: string[]): string => {
//     if (userList.length <= 0) {
//       return "";
//     } else if (userList.length === 1) {
//       return userList[0];
//     } else if (userList.length === 2) {
//       return `${userList[0]} and ${userList[1]}`;
//     } else {
//       const commaSeparated = userList.slice(0, -1).join(", ");
//       return `${commaSeparated}, and ${userList[userList.length - 1]}`;
//     }
//   };

//   return (
//     <div className="unit-list">
//       <h3>{`${userName}'s`} Units</h3>
//       {userUnits.map((unit) => (
//         <ul
//           className={`unit-item ${
//             expandedUnitId === unit.id ? "expanded" : ""
//           }`}
//           key={unit.id}
//         >
//           <div className="unit-info">
//             <div
//               className={`main-info-unit ${
//                 expandedUnitId === unit.id ? "expanded-unit" : ""
//               }`}
//               onClick={() => handleToggleExpansion(unit.id)}
//             >
//               <strong>{unit.name}</strong>
//               <p>
//                 Address:
//                 <b>{` ${unit.address}.`}</b>
//               </p>
//               <p>Type: {unit.unit_type.name}</p>
//             </div>
//             {expandedUnitId === unit.id && (
//               <div className="additional-info-unit">
//                 <div className="user-partners">
//                   <p>
//                     Unit partners:{" "}
//                     <b>
//                       {` ${formatUserList(
//                         unit.users.map((user: any) => user.name)
//                       )}.`}
//                     </b>
//                   </p>
//                 </div>
//                 {showMovements === null && (
//                   <button
//                     className="btn-show-movement"
//                     onClick={() => handleToggleShowMovements(unit.id)}
//                   >
//                     Show Movements
//                   </button>
//                 )}

//                 {showMovements !== null && (
//                   <button
//                     className="btn-hide-movement"
//                     onClick={() => handleToggleShowMovements(unit.id)}
//                   >
//                     Hide Movements
//                   </button>
//                 )}

//                 {showMovements === unit.id && (
//                   <div className="transaction-list">
//                     {unit.movements.map((item: any) => (
//                       <ul
//                         className={`transaction-item ${
//                           expandedMovementId === item.id ? "expanded" : ""
//                         }`}
//                         key={item.id}
//                       >
//                         <div
//                           className="transaction-info"
//                           onClick={() => handleToggleExpansionMovement(item.id)}
//                         >
//                           <div
//                             className={`main-info ${
//                               expandedMovementId === item.id ? "expanded" : ""
//                             }`}
//                           >
//                             <p>
//                               <b>{item.description}</b> {`(${item.user.name})`}
//                             </p>

//                             {/* {item.description}
//                             <span>|{item.user.name}|</span> */}
//                             <span className="transaction-amount">
//                               {item.concept === 1
//                                 ? `$ ${item.amount}`
//                                 : `-$ ${item.amount}`}
//                             </span>
//                           </div>
//                           {expandedMovementId === item.id && (
//                             <div className="additional-info">
//                               <div className="date-user">
//                                 <span>
//                                   Date:
//                                   <b>
//                                     {` ${new Date(
//                                       item.date
//                                     ).toLocaleDateString()},
//                                     ${new Date(item.date).toLocaleTimeString(
//                                       [],
//                                       {
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                       }
//                                     )} `}
//                                   </b>
//                                   hs.
//                                 </span>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </ul>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </ul>
//       ))}
//     </div>
//   );
// };
// export default UserUnits;

import React from "react";
import { useUserUnits } from "../../context/userUnitsContext";
import UserUnitItem from "./UserUnitItem"; // Nueva importación
import { useAuth } from "../../context/authContext";
import "./UserUnits.css";

const UserUnits: React.FC = () => {
  const { userUnits } = useUserUnits();
  const { userName } = useAuth();

  return (
    <div className="unit-list">
      <h3>{`${userName}'s`} Units</h3>
      {userUnits.map((unit) => (
        <UserUnitItem key={unit.id} unit={unit} />
      ))}
    </div>
  );
};

export default UserUnits;

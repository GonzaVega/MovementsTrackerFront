import React, { useContext, useState, useEffect } from "react";
import { BalanceContext } from "./context/balanceContext";
const Balance = () => {
  const balance = useContext(BalanceContext);
  // todo: prever el caso en que el balance sea negativo

  return (
    <div>
      <h4>Your Balance</h4>
      <h1 id="balance">${balance}</h1>
    </div>
  );
};

export default Balance;

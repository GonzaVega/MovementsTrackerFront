import React from "react";

const UnitType = (props: any) => {
  return (
    <div>
      <h3>Unit {props.data.id}</h3>
      <p>Name: {props.data.name}</p>
    </div>
  );
};

export default UnitType;

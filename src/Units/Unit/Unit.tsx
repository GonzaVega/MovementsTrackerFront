import React from "react";

const Unit = (props: any) => {
  // You can add any additional logic or transformations you need for the Unit data here

  return (
    <div>
      <h3>Unit {props.data.id}</h3>
      <p>Name: {props.data.name}</p>
      <p>Address: {props.data.address}</p>
      <p>Unit Type ID: {props.data.unit_type_id}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Unit;

import { useState } from "react";
import { User } from "../App";

const ItemInfo = (props: any) => {
  return (
    <div>
      <h3>Testing endpoint</h3>
      <p>Name: {props.profile.name}</p>
      <p>E-mail: {props.profile.email}</p>
      <p>Unit: {props.profile.unit_id}</p>
      <p>Id: {props.profile.id}</p>
    </div>
  );
};

export default ItemInfo;

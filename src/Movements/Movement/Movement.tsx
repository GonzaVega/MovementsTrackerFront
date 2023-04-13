import { useState, useEffect } from "react";
const Movement = (props: any) => {
  // const [concept, setConcept] = useState<number | string>("");
  // switch {
  //   case
  // }

  // case (props.data.description == 1) {
  //   return 'income'
  // }
  // if
  let concept: string = "";
  const transformDataHandler = (data: number) => {
    if (data === 1) {
      return (concept = "income");
    }
    if (data === 2) {
      return (concept = "expense");
    }
  };
  transformDataHandler(props.data.concept);

  return (
    <div>
      <h3>Movement {props.data.id}</h3>
      <p>Amount: {props.data.amount}</p>
      <p>Concept: {concept}</p>
      <p>Description: {props.data.description}</p>
      <p>Date: {props.data.date}</p>
      <p>Unit: {props.data.unit_id}</p>
    </div>
  );
};
export default Movement;

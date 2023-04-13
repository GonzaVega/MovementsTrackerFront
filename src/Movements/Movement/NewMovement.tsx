import { useState } from "react";
import Movement from "./Movement";
import MovementForm, { MovementFormState } from "./MovementForm";

const NewMovement: React.FC = () => {
  const [movementCreation, setMovementCreation] = useState(
    "awaiting new movement"
  );
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const handleFormSubmit = async (
    amount: number,
    concept: number,
    description: string,
    date: string,
    unit_id: number,
    user_id: number
  ) => {
    const res = await fetch("http://127.0.0.1:3001/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movement: { amount, concept, description, date, unit_id, user_id },
      }),
    });
    if (res.ok) {
      const newMovement = await res.json();
      setIsFormSubmited(true);
      setMovementCreation(newMovement);
      // here you can use newMovement.id, newMovement.amount, newMovement.concept, newMovement.description, newMovement.date, newMovement.unit_id, newMovement.user_id
      //to update your component state or show the information in a notification
    } else {
      console.log(`Error: ${res.status} - ${res.statusText}`);
    }
  };

  return (
    <div>
      <h2>New Movement</h2>
      <MovementForm onSubmit={handleFormSubmit} />
      {isFormSubmited && <Movement data={movementCreation} />}
    </div>
  );
};
export default NewMovement;

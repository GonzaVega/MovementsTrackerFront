import { useContext, useState } from "react";
import Movement from "./Movement";
import MovementForm, { MovementFormState } from "./MovementForm";
import { useAuth } from "../../context/authContext";
import "../../Modal/Modal.css";

const NewMovement: React.FC = () => {
  const [movementCreation, setMovementCreation] = useState(
    "awaiting new movement"
  );
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { accessToken, client, uid } = useAuth();

  const handleFormSubmit = async (
    amount: number,
    concept: number,
    description: string,
    date: string,
    unit_id: number,
    user_id: number
  ) => {
    const res = await fetch("http://localhost:3001/api/movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken!,
        uid: uid!,
        client: client!,
      },
      body: JSON.stringify({
        movement: { amount, concept, description, date, unit_id, user_id },
      }),
    });
    if (res.ok) {
      const newMovement = await res.json();
      setIsFormSubmited(true);
      setMovementCreation(newMovement);
    } else {
      console.log(`Error: ${res.status} - ${res.statusText}`);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsFormSubmited(false);
  };

  return (
    <div>
      <button className="btn-ok-modal" onClick={handleModalOpen}>
        <p>New Movement</p>
      </button>

      {isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h2>New Movement</h2>
            <MovementForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}

      {isFormSubmited && <Movement data={movementCreation} />}

      {isFormSubmited && isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h4 style={{ color: "#44b735" }}>
              Your Movement was successfully created!
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewMovement;

import React, { useState } from "react";
import UnitType from "./UnitType";
import UnitTypeForm from "./UnitTypeForm";
import { useAuth } from "../../context/authContext";
import "../../Modal/Modal.css";

const NewUnitType: React.FC = () => {
  const [unitTypeCreation, setUnitTypeCreation] = useState<any>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { accessToken, client, uid } = useAuth();

  const handleFormSubmit = async (name: string) => {
    const response = await fetch("http://localhost:3001/api/unit_types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken!,
        uid: uid!,
        client: client!,
      },
      body: JSON.stringify({
        unit_type: { name },
      }),
    });

    if (response.ok) {
      const newUnitType = await response.json();
      setIsFormSubmitted(true);
      setUnitTypeCreation(newUnitType);
    } else {
      console.log(`Error: ${response.status} - ${response.statusText}`);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsFormSubmitted(false);
  };

  return (
    <div>
      <button className="btn-ok-modal" onClick={handleModalOpen}>
        <p>New Unit Type</p>
      </button>

      {isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h2>New Unit Type</h2>
            <UnitTypeForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}

      {isFormSubmitted && unitTypeCreation && (
        <UnitType data={unitTypeCreation} />
      )}

      {isFormSubmitted && isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h4 style={{ color: "#44b735" }}>
              Your Unit Type was successfully created!
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUnitType;

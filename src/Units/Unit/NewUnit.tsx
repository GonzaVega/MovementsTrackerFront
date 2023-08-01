import { useState } from "react";
import Unit from "./Unit"; // Importa el componente que mostrará los detalles de la nueva unidad
import UnitForm from "./UnitForm"; // Importa el componente que contiene el formulario para crear una unidad
import { useAuth } from "../../context/authContext";
import "../../Modal/Modal.css";

const NewUnit: React.FC = () => {
  const [unitCreation, setUnitCreation] = useState("awaiting new unit");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { accessToken, client, uid } = useAuth();

  const handleFormSubmit = async (
    name: string,
    address: string,
    unit_type_id: number
  ) => {
    const response = await fetch("http://localhost:3001/api/units", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken!,
        uid: uid!,
        client: client!,
      },
      body: JSON.stringify({
        unit: { name, address, unit_type_id },
      }),
    });

    if (response.ok) {
      const newUnit = await response.json();
      setIsFormSubmitted(true);
      setUnitCreation(newUnit);
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
        <p>New Unit</p>
      </button>

      {isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h2>New Unit</h2>
            <UnitForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}

      {isFormSubmitted && <Unit data={unitCreation} />}

      {isFormSubmitted && isModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-container open">
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
            <h4 style={{ color: "#44b735" }}>
              Your Unit was successfully created!
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUnit;

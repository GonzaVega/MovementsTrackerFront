import React, { useState, useEffect } from "react";
import RegisterForm from "../Authentication/Register/RegisterForm";
import "./Modal.css";

interface ModalProps {
  restoreAppState: () => void;
}

const Modal: React.FC<ModalProps> = ({ restoreAppState }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  // useEffect(() => {
  //   setIsModalOpen(true);
  // }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      restoreAppState();
    }, 300); // Espera 500ms para restaurar el estado de la aplicación después de cerrar el modal
  };
  return (
    <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}>
      <div className={`modal-container ${isModalOpen ? "open" : ""}`}>
        <button className="close-button" onClick={handleCloseModal}>
          x
        </button>
        <RegisterForm closeModal={handleCloseModal} />
      </div>
    </div>
  );
};

export default Modal;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "../Authentication/Register/RegistrationModal";
import { ModalProvider, ModalContext } from "../context/modalContext";

const SuccessfulRegistrationRoute = () => {
  const history = useNavigate();
  const { closeModal } = useContext(ModalContext);

  const handleModalClose = () => {
    console.log("modalworking");
    closeModal();
    history("/");
  };

  return (
    <ModalProvider>
      <div>
        <RegistrationModal onClose={handleModalClose} />
      </div>
    </ModalProvider>
  );
};
export default SuccessfulRegistrationRoute;

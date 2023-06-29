import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "../Authentication/Register/RegistrationModal";
import { ModalProvider, ModalContext } from "../context/modalContext";
import { Login } from "../Authentication/Login";

const SuccessfulRegistrationRoute = () => {
  const history = useNavigate();
  const { closeModal } = useContext(ModalContext);

  const handleModalClose = () => {
    closeModal();
    history("/");
  };

  return (
    <ModalProvider>
      <RegistrationModal onClose={handleModalClose} />
    </ModalProvider>
  );
};
export default SuccessfulRegistrationRoute;

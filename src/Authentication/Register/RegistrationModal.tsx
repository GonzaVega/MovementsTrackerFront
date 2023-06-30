import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";
import "./RegistrationModal.css";

type ModalProps = {
  onClose: () => void;
};

const RegistrationModal: React.FC<ModalProps> = ({ onClose }) => {
  const { isOpen, message, closeModal, openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const registrationModalMsg: string =
      "Welcome to the app, please login for the first time";

    openModal(registrationModalMsg);
  }, []);

  const handleCloseModal = () => {
    setIsClosed(true);
    setTimeout(() => {
      closeModal();
      onClose();
    }, 200);
  };

  return isOpen ? (
    <div className={`modal-overlayReg ${isClosed ? "closed" : ""}`}>
      <div className={`modal-contentReg ${isClosed ? "closed" : ""}`}>
        <h2 className="modal-titleReg">Successful Registration!</h2>
        <p className="modal-messageReg">{message}</p>
        <button className="modal-close-btnReg" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default RegistrationModal;

import React, { useContext } from "react";
import "./RegistrationModal.css";
import { ModalContext } from "../../context/modalContext";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  onClose: () => void;
};

const RegistrationModal: React.FC<ModalProps> = ({ onClose }) => {
  const { isOpen, message, closeModal, openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  // const handleCloseModal = () => {
  //   closeModal();
  // };

  const registrationModalMsg: string =
    "Welcome to the app 'here we could put the new user's name'";

  openModal(registrationModalMsg);

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Successful Registration!</h2>
        <p className="modal-message">{message}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default RegistrationModal;

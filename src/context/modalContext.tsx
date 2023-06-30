import React, { createContext, useState } from "react";

type ModalContextValue = {
  isOpen: boolean;
  message: string;
  openModal: (message: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  message: "",
  openModal: (message: string) => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };
  console.log(isOpen);
  const value = {
    isOpen,
    message,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

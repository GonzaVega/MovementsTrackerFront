import React, { useState } from "react";

interface UnitTypeFormProps {
  onSubmit: (name: string) => void;
}

const UnitTypeForm: React.FC<UnitTypeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <form
      className="form-control"
      style={{ margin: "1px" }}
      onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button className="btn" type="submit">
        Create Unit Type
      </button>
    </form>
  );
};

export default UnitTypeForm;

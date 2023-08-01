import React, { useContext, useState } from "react";
import { UsersContext } from "../../context/usersContext";
import { UnitsContext } from "../../context/unitsContext";

interface UnitFormProps {
  onSubmit: (name: string, address: string, unit_type_id: number) => void;
}

const UnitForm: React.FC<UnitFormProps> = ({ onSubmit }) => {
  const { users } = useContext(UsersContext);
  const { units } = useContext(UnitsContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [unit_type_id, setUnitTypeId] = useState(1); // Assuming the default value is 1, change this as needed

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, address, unit_type_id);
    // Reset form fields after submission (if needed)
    setName("");
    setAddress("");
    setUnitTypeId(1); // Reset to default value
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
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Unit Type ID:
        <select
          className="form-select"
          value={unit_type_id}
          onChange={(e) => setUnitTypeId(parseInt(e.target.value))}
        >
          {/* Render options for unit types */}
          {units.map((unit: any) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      {/* Add more form fields if needed */}
      <button className="btn" type="submit">
        Create Unit
      </button>
    </form>
  );
};

export default UnitForm;

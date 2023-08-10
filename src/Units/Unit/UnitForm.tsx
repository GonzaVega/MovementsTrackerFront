import React, { useContext, useState } from "react";
import { UsersContext } from "../../context/usersContext";
import { UnitsContext } from "../../context/unitsContext";
import { UnitTypesContext } from "../../context/unitTypeContext";

interface UnitFormProps {
  onSubmit: (name: string, address: string, unit_type_id: number) => void;
}

const UnitForm: React.FC<UnitFormProps> = ({ onSubmit }) => {
  const { users } = useContext(UsersContext);
  const { unitTypes } = useContext(UnitTypesContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [unit_type_id, setUnitTypeId] = useState(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, address, unit_type_id);
    setName("");
    setAddress("");
    setUnitTypeId(1);
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
          {unitTypes.map((unitType: any) => (
            <option key={unitType.id} value={unitType.id}>
              {unitType.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button className="btn" type="submit">
        Create Unit
      </button>
    </form>
  );
};

export default UnitForm;

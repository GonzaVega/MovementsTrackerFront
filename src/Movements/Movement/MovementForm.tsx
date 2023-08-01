import React, { useReducer, useContext } from "react";
import { UsersContext } from "../../context/usersContext";
import { UnitsContext } from "../../context/unitsContext";

export interface MovementFormState {
  amount: number;
  concept: number;
  description: string;
  date: string;
  unit_id: number;
  user_id: number;
}

interface MovementFormProps {
  onSubmit: (
    amount: number,
    concept: number,
    description: string,
    date: string,
    unit_id: number,
    user_id: number
  ) => void;
}

type MovementFormAction =
  | { type: "update_amount"; payload: number }
  | { type: "update_concept"; payload: number }
  | { type: "update_description"; payload: string }
  | { type: "update_date"; payload: string }
  | { type: "update_unit_id"; payload: number }
  | { type: "update_user_id"; payload: number };

const movementFormReducer = (
  state: MovementFormState,
  action: MovementFormAction
): MovementFormState => {
  switch (action.type) {
    case "update_amount":
      return { ...state, amount: action.payload };
    case "update_concept":
      return { ...state, concept: action.payload };
    case "update_description":
      return { ...state, description: action.payload };
    case "update_date":
      return { ...state, date: action.payload };
    case "update_unit_id":
      return { ...state, unit_id: action.payload };
    case "update_user_id":
      return { ...state, user_id: action.payload };
    default:
      return state;
  }
};

const MovementForm: React.FC<MovementFormProps> = ({ onSubmit }) => {
  const [formState, dispatch] = useReducer(movementFormReducer, {
    amount: 0,
    concept: 1,
    description: "",
    date: new Date().toISOString().slice(0, 16),
    unit_id: 1,
    user_id: 0,
  });
  const { users } = useContext(UsersContext);
  const { units } = useContext(UnitsContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(
      formState.amount,
      formState.concept,
      formState.description,
      formState.date,
      formState.unit_id,
      formState.user_id
    );
    dispatch({ type: "update_amount", payload: 0 });
    dispatch({ type: "update_concept", payload: 0 });
    dispatch({ type: "update_description", payload: "" });
    dispatch({
      type: "update_date",
      payload: new Date().toISOString().slice(0, 16),
    });
    dispatch({ type: "update_unit_id", payload: 0 });
    dispatch({ type: "update_user_id", payload: 0 });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "update_amount", payload: parseInt(event.target.value) });
  };

  const handleConceptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    dispatch({ type: "update_concept", payload: selectedValue });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "update_description", payload: event.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "update_date", payload: event.target.value });
  };

  const handleUnitIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    dispatch({ type: "update_unit_id", payload: selectedValue });
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    dispatch({ type: "update_user_id", payload: selectedValue });
  };

  return (
    <form
      className="form-control"
      style={{ margin: "1px" }}
      onSubmit={handleSubmit}
    >
      <label>
        Amount:
        <input
          type="number"
          value={formState.amount}
          onChange={handleAmountChange}
        />
      </label>
      <br />
      <label>
        Concept:
        <select
          className="form-select"
          value={formState.concept}
          onChange={handleConceptChange}
        >
          <option value={1}>Income</option>
          <option value={2}>Expense</option>
        </select>
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={formState.description}
          onChange={handleDescriptionChange}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="datetime-local"
          value={formState.date}
          onChange={handleDateChange}
        />
      </label>
      <br />
      <label>
        Unit ID:
        <select
          className="form-select"
          value={formState.unit_id}
          onChange={handleUnitIdChange}
        >
          {units.map((unit: any) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        User ID:
        <select
          className="form-select"
          value={formState.user_id}
          onChange={handleUserIdChange}
        >
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button className="btn" type="submit">
        Create Movement
      </button>
    </form>
  );
};
export default MovementForm;

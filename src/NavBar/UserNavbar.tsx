import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Option } from "./Dropdown";
import { UsersContext, User } from "../context/usersContext";

const UserNavbar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const [userOption, setUserOption] = useState<Option[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<string>("");
  const { users } = useContext(UsersContext);

  useEffect(() => {
    const dropdownLabel = "Partners";
    const itemOptions = users.map((user: User) => ({
      label: user.name!,
      value: JSON.stringify(user.id),
    }));

    setUserOption(itemOptions);

    setCategoryDropdown(dropdownLabel);
  }, [users]);

  const handleOptionSelected = (option: Option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <Dropdown
        options={userOption}
        selectedOption={selectedOption}
        onOptionSelected={handleOptionSelected}
        dropdownCategory={categoryDropdown}
      />
      <button className="nav-btn">
        <Link to="/units">Units</Link>
      </button>
      <button className="nav-btn">
        <Link to="/movements">Movements</Link>
      </button>
    </>
  );
};

export default UserNavbar;

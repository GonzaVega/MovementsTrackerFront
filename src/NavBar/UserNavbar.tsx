import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Option } from "./Dropdown";

const UserNavbar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const [userOption, setUserOption] = useState<Option[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<string>("");
  useEffect(() => {
    const userOptions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/users.json");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const dropdownLabel = "Partners";

        const data = await response.json();

        const itemOptions = data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setUserOption(itemOptions);
        setCategoryDropdown(dropdownLabel);
      } catch (error: any) {
        console.log(error.message);
        return [];
      }
    };
    userOptions();
  }, []);
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

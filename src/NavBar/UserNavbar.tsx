import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Option } from "./Dropdown";
import { UsersContext, User } from "../context/usersContext";
import { UnitsContext, Unit } from "../context/unitsContext";

const UserNavbar: React.FC = () => {
  const [userSelectedOption, setUserSelectedOption] = useState<
    Option | undefined
  >(undefined);
  const [unitSelectedOption, setUnitSelectedOption] = useState<
    Option | undefined
  >(undefined);
  const [userOption, setUserOption] = useState<Option[]>([]);
  const [unitOption, setUnitOption] = useState<Option[]>([]);
  const [usersCategoryDropdown, setUsersCategoryDropdown] =
    useState<string>("");
  const [unitsCategoryDropdown, setunitsCategoryDropdown] =
    useState<string>("");
  const { users } = useContext(UsersContext);
  const { units } = useContext(UnitsContext);

  useEffect(() => {
    const userDropdownLabel = "Partners";
    const unitsDropdownLabel = "Units";
    const userOptions = users.map((user: User) => ({
      label: user.name!,
      value: JSON.stringify(user.id),
    }));

    setUserOption(userOptions);

    setUsersCategoryDropdown(userDropdownLabel);

    const unitOption = units.map((unit: Unit) => ({
      label: unit.name,
      value: JSON.stringify(unit.id),
      address: unit.address,
    }));
    setUnitOption(unitOption);
    setunitsCategoryDropdown(unitsDropdownLabel);
  }, [users, units]);

  const handleUserOptionSelected = (option: Option) => {
    setUserSelectedOption(option);
  };
  const handleUnitOptionSelected = (option: Option) => {
    setUnitSelectedOption(option);
  };
  return (
    <>
      <Dropdown
        options={userOption}
        selectedOption={userSelectedOption}
        onOptionSelected={handleUserOptionSelected}
        dropdownCategory={usersCategoryDropdown}
      />
      <Dropdown
        options={unitOption}
        selectedOption={unitSelectedOption}
        onOptionSelected={handleUnitOptionSelected}
        dropdownCategory={unitsCategoryDropdown}
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

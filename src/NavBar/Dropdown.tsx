import React, { useEffect, useState } from "react";

export type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  selectedOption?: Option;
  onOptionSelected: (option: Option) => void;
  dropdownCategory: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionSelected,
  dropdownCategory,
}) => {
  // const [category, setCategory] = useState<string>("");
  // useEffect(() => {
  //   setCategory(dropdownCategory);
  // }, []);
  // console.log(selectedOption);
  return (
    <select
      className="nav-btn-drop"
      value={selectedOption ? selectedOption.value : ""}
      onChange={(e) => {
        const selectedValue = e.target.value;
        const selected = options.find(
          (option) => option.value === selectedValue
        );
        if (selected) {
          onOptionSelected(selected);
        }
      }}
    >
      <option value="">--Select {dropdownCategory}--</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
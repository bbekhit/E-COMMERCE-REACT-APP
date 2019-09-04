import React from "react";

const SelectList = ({ name, value, onChange, options, label, className }) => {
  const selectOptions = options.map(option => (
    <option key={option.id} value={option.name}>
      {option.name}
    </option>
  ));
  return (
    <div className={className}>
      <select name={name} value={value} onChange={onChange}>
        <option value="">{`Choose ${label}`}</option>
        {selectOptions}
      </select>
    </div>
  );
};

export default SelectList;

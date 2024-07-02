"use client";
import { useState } from "react";

export default function SelectBox() {
  // State to keep track of selected values and enabled status of select boxes
  const [selectedValues, setSelectedValues] = useState({
    select1: "",
    select2: "",
    select3: "",
    select4: "",
  });
  const [enabled, setEnabled] = useState({
    select1: true,
    select2: false,
    select3: false,
    select4: false,
  });

  // Options for the select boxes (You can replace these with your dynamic options)
  const options1 = ["Option 1.1", "Option 1.2", "Option 1.3"];
  const options2 = ["Option 2.1", "Option 2.2", "Option 2.3"];
  const options3 = ["Option 3.1", "Option 3.2", "Option 3.3"];
  const options4 = ["Option 4.1", "Option 4.2", "Option 4.3"];

  // Handler for changing select values
  const handleSelectChange = (e:any, selectNumber:any) => {
    const { value } = e.target;
    setSelectedValues({
      ...selectedValues,
      [`select${selectNumber}`]: value,
    });

    if (value) {
      setEnabled({
        ...enabled,
        [`select${selectNumber + 1}`]: true,
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Box Chain</h1>

      <div>
        <label htmlFor="select1">Select Box 1</label>
        <select
          id="select1"
          value={selectedValues.select1}
          onChange={(e) => handleSelectChange(e, 1)}
          disabled={!enabled.select1}
        >
          <option value="">--Select an option--</option>
          {options1.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="select2">Select Box 2</label>
        <select
          id="select2"
          value={selectedValues.select2}
          onChange={(e) => handleSelectChange(e, 2)}
          disabled={!enabled.select2}
        >
          <option value="">--Select an option--</option>
          {options2.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="select3">Select Box 3</label>
        <select
          id="select3"
          value={selectedValues.select3}
          onChange={(e) => handleSelectChange(e, 3)}
          disabled={!enabled.select3}
        >
          <option value="">--Select an option--</option>
          {options3.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="select4">Select Box 4</label>
        <select
          id="select4"
          value={selectedValues.select4}
          onChange={(e) => handleSelectChange(e, 4)}
          disabled={!enabled.select4}
        >
          <option value="">--Select an option--</option>
          {options4.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

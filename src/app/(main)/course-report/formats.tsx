import React, { useState, ChangeEvent } from "react";

export default function CourseFormatGroup() {
  const [selectedOption, setSelectedOption] = useState("selfpaced");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="">
      <label>
        <input
          type="radio"
          value="selfpaced"
          checked={selectedOption === "selfpaced"}
          onChange={handleChange}
        />
        Self-paced
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="live"
          checked={selectedOption === "live"}
          onChange={handleChange}
        />
        Live Virtual Meeting
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="hybrid"
          checked={selectedOption === "hybrid"}
          onChange={handleChange}
        />
        Hybrid
      </label>
    </div>
  );
}

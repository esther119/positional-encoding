import React from "react";

const ControlPanel = ({ setPosition, setFrequency }) => {
  return (
    <div>
      <label>
        Position:
        <input type="number" onChange={(e) => setPosition(+e.target.value)} />
      </label>
      <label>
        Frequency:
        <input
          type="number"
          step="0.1"
          onChange={(e) => setFrequency(+e.target.value)}
        />
      </label>
    </div>
  );
};
export default ControlPanel;

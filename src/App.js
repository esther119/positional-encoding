import React, { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import "chart.js/auto";
import MathComponent from "./Math";
import BinaryComponent from "./Binary";
// import { Annotation } from "chartjs-plugin-annotation";

function SineWave() {
  const [clickedXValue, setClickedXValue] = useState("");
  const [sinValues, setSinValues] = useState([
    { label: "sin(x/10)", value: "0.00" },
    { label: "sin(x/100)", value: "0.00" },
    { label: "sin(x/1000)", value: "0.00" },
    { label: "sin(x/10000)", value: "0.00" },
  ]);

  // Generating data points for all sine waves with an extended range
  const dataPoints = Array.from({ length: 2000 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 10), // First wave: i=0
  }));

  const dataPointsSecondWave = Array.from({ length: 2000 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 100), // Second wave: i=1
  }));

  const dataPointsThirdWave = Array.from({ length: 2000 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 1000), // Third wave: i=2
  }));

  const dataPointsFourthWave = Array.from({ length: 2000 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 10000), // Fourth wave: i=3
  }));

  const data = {
    datasets: [
      {
        label: "Sine Wave (sin(pos/10))",
        data: dataPoints,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Sine Wave (sin(pos/100))",
        data: dataPointsSecondWave,
        borderColor: "red",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Sine Wave (sin(pos/1000))",
        data: dataPointsThirdWave,
        borderColor: "green",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Sine Wave (sin(pos/10000))",
        data: dataPointsFourthWave,
        borderColor: "purple",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: 2000, // Extend x-axis to 2000
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip: {
        enabled: false, // Disable default tooltip
      },
    },

    onClick: (event, element, chart) => {
      const bounds = chart.chartArea;
      if (
        event.x >= bounds.left &&
        event.x <= bounds.right &&
        event.y >= bounds.top &&
        event.y <= bounds.bottom
      ) {
        const xScale = chart.scales.x;
        const xValue = xScale.getValueForPixel(event.x);
        const yValue1 = Math.sin(xValue / 10);
        const yValue2 = Math.sin(xValue / 100);
        const yValue3 = Math.sin(xValue / 1000);
        const yValue4 = Math.sin(xValue / 10000);
        setSinValues([
          { label: "sin(x/10)", value: yValue1.toFixed(2) },
          { label: "sin(x/100)", value: yValue2.toFixed(2) },
          { label: "sin(x/1000)", value: yValue3.toFixed(2) },
          { label: "sin(x/10000)", value: yValue4.toFixed(2) },
        ]);
        setClickedXValue(xValue.toFixed(0));
        // setClickedValue(
        //   `x: ${xValue.toFixed(0)}, sin(x/10): ${yValue1.toFixed(
        //     2
        //   )}, sin(x/100): ${yValue2.toFixed(2)}, sin(x/1000): ${yValue3.toFixed(
        //     2
        //   )}, sin(x/10000): ${yValue4.toFixed(2)}`
        // );
      }
    },
    elements: {
      point: {
        radius: 0, // Disable point rendering
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="chart-container">
      <BinaryComponent></BinaryComponent>
      <MathComponent></MathComponent>
      <Line data={data} options={options} />
      {/* {clickedValue && <div>Clicked Value: {clickedValue}</div>} */}

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Position Value</th>
              {sinValues.map((item) => (
                <th key={item.label}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{clickedXValue}</td>
              {sinValues.map((item) => (
                <td key={item.label}>{item.value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SineWave;

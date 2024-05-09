import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PositionalEncodingVisualizer = ({
  position,
  dimension,
  modelDim = 512,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    drawGraph();
  }, [position, dimension, modelDim]);

  const drawGraph = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG contents.

    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([-1, 1])
      .range([height - margin.bottom, margin.top]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Data generation for sinusoidal functions
    const data = d3.range(100).map((d) => {
      return {
        position: d,
        sine: Math.sin(d / Math.pow(10000, (2 * dimension) / modelDim)),
        cosine: Math.cos(d / Math.pow(10000, (2 * dimension) / modelDim)),
      };
    });

    // Line generator
    const line = d3
      .line()
      .x((d) => xScale(d.position))
      .y((d) => yScale(d.sine));

    const line2 = d3
      .line()
      .x((d) => xScale(d.position))
      .y((d) => yScale(d.cosine));

    // Drawing lines
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", line2);
  };

  return <svg ref={svgRef} width="800" height="300"></svg>;
};

export default PositionalEncodingVisualizer;

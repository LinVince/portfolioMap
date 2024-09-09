/*import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { Box } from "@mui/material";
import React from "react";

export interface DataPoint {
  Time: string;
  [key: string]: number | string;
}

interface MultiLineChartProps {
  data: DataPoint[];
  max: number;
  lines: { key: string; color: string }[];
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  data,
  max,
  lines,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="100%" height={500} style={{ paddingTop: 20 }}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="Time" domain={[2000]} />
          <YAxis
            domain={[0, max + 100]}
            label={{
              value: "Number of Incidents",
              angle: -90,
              position: "insideBottomLeft",
            }}
          />

          {lines.map((line) => {
            const lastDataPoint = data[data.length - 1];
            const yValue = lastDataPoint ? lastDataPoint[line.key] : 0;
            const yPos = 460 * (1 - (yValue as number) / (max + 100));

            return (
              <React.Fragment key={line.key}>
                <Line
                  type="natural"
                  dataKey={line.key}
                  stroke={line.color}
                  activeDot={{ r: 8 }}
                  dot={false}
                />
                <text
                  x="80%" // Adjust based on chart width
                  y={`${yPos}`}
                  fill={line.color}
                  className="labelText"
                  fontSize={16}
                  textAnchor="start" // Adjust textAnchor to 'start' to align the text from the beginning
                  alignmentBaseline="middle" // Ensures vertical alignment in the middle
                >
                  {line.key}
                </text>
              </React.Fragment>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MultiLineChart;
*/

import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { darkThemeOptions, lightThemeOptions } from "../theme";
import { useMediaQuery } from "@mui/system";

export interface DataPoint {
  Time: string;
  [key: string]: number | string;
}

interface MultiLineChartProps {
  data: DataPoint[];
  max: number;
  lines: { key: string; color: string }[];
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  data,
  max,
  lines,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const darkMode = useSelector((state: any) => state.darkMode);
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;
  const isDevice = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    // Clear previous SVG content
    d3.select(chartRef.current).selectAll("*").remove();

    // Calculate responsive dimensions
    const containerWidth = chartRef.current?.parentElement?.clientWidth || 960;
    const containerHeight = 500;
    const margin = { top: 20, right: 150, bottom: 50, left: 50 }; // Increase right margin for more label space
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Define scales
    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => new Date(d.Time)) as [Date, Date])
      .range([0, isDevice ? width : width - 200]); // Shorten the range to leave room for labels

    const y = d3
      .scaleLinear()
      .domain([0, max + 100])
      .range([height, 0]);

    // Create the SVG container
    const svg = d3
      .select(chartRef.current)
      .attr("width", "100%")
      .attr("height", containerHeight)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the Y axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "currentColor")
      .attr("x", -margin.left)
      .attr("y", -10)
      .attr("text-anchor", "start")
      .text("Number of Incidents");

    // Create a line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => x(new Date(d.Time)))
      .y((d) => y(d[lines[0].key] as number));

    // Draw the lines
    lines.forEach(({ key, color }) => {
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr(
          "d",
          line.y((d) => y(d[key] as number))
        );

      // Add the label at the end of the line in the reserved label area
      /*const lastDataPoint = data[data.length - 1];
      const yValue = lastDataPoint ? lastDataPoint[key] : 0;
      const yPos = y(yValue as number);
      const labelXPos = width + 10; // Position labels outside shortened lines

      // Wrap text if it's too long
      const wrapText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number
      ) => {
        const words = text.split(" ");
        let line = "";
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const dy = 0;

        const tspan = svg
          .append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("fill", color)
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "middle");

        words.forEach((word, i) => {
          const testLine = line + word + " ";
          const testWidth = svg.node()?.getBoundingClientRect().width || 0;

          if (testWidth > maxWidth && i > 0) {
            tspan
              .append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", `${lineNumber++ * lineHeight + dy}em`)
              .text(line);
            line = word + " ";
          } else {
            line = testLine;
          }
        });

        tspan
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", `${lineNumber * lineHeight + dy}em`)
          .text(line.trim());
      };

      // Use wrapText function for the label
      wrapText(key, labelXPos, yPos, margin.right);*/
    });

    //Adding a legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${isDevice ? width + 50 : width - 150},0)`); // Position the legend

    // Get the last data point from the data array
    const lastDataPoint = data[data.length - 1];

    // Ensure lastDataPoint is not null or undefined
    if (lastDataPoint) {
      // Remove "Time" and sort the fields by values
      const sortedFields = Object.entries(lastDataPoint)
        .filter(([key]) => key !== "Time") // Remove "Time"
        .sort(
          ([, valueA], [, valueB]) => (valueB as number) - (valueA as number)
        ) // Sort by values in descending order
        .slice(0, 4); // Keep only the top 4

      // Create an object with only the top 4 fields
      const topFourDataPoint = Object.fromEntries(sortedFields);
      console.log(topFourDataPoint);

      // Get the list of keys from the topFourDataPoint object
      const topFourKeys = Object.keys(topFourDataPoint);
      console.log(topFourKeys);

      // Iterate through the lines and add legend items for the top 4 fields
      lines.forEach((line, i) => {
        // Check if line.key is in the topFourKeys
        if (topFourKeys.includes(line.key)) {
          const yValue = topFourDataPoint[line.key] || 0; // Default to 0 if undefined
          const yPos = y(yValue as number);

          const legendItem = legend
            .append("g")
            .attr("transform", `translate(0,${i})`); // Adjust spacing between legend items (25px apart)

          legendItem
            .append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("y", yPos) // Reset y to 0 because we are already translating by i * 25
            .attr("fill", line.color);

          legendItem
            .append("text")
            .attr("x", 20)
            .attr("y", yPos + 5) // Vertically center the text with respect to the rect
            .attr("font-size", "1.4vw")
            .attr("dy", "0.32em")
            .attr("fill", theme.palette.text.primary)
            .text(line.key);
        }
      });
    } else {
      console.error("Last data point is null or undefined.");
    }

    //legend ends
  }, [data, lines, max, darkMode]);

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default MultiLineChart;

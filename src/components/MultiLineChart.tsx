import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
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

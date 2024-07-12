import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { DataBreachesSumedTypeByMonth } from "../data/DataBreaches";

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface MultiLineChartProps {
  data: DataPoint[];
  lines: { key: string; color: string }[];
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({ data, lines }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 50]} />

        {lines.map((line) => {
          const lastDataPoint = data[data.length - 1];
          const yValue = lastDataPoint ? lastDataPoint[line.key] : 0;
          const yPos = 100 - (yValue as number) / 100; // Adjust y position calculation as per your requirement

          return (
            <React.Fragment key={line.key}>
              <Line
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                activeDot={{ r: 8 }}
              />
              <text
                x="95%" // Adjust based on chart width
                y={`${yPos}%`}
                fill={line.color}
                className="labelText"
                fontSize={30}
                textAnchor="middle"
              >
                {line.key}
              </text>
            </React.Fragment>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

const data = DataBreachesSumedTypeByMonth;

const lines = [
  { key: "Hacking/IT Incident", color: "#8884d8" },
  { key: "Improper Disposal", color: "#82ca9d" },
  { key: "Loss", color: "#ff7300" },
];

const DataBreaches: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false); // State to control animation
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null); // State to track latest timestamp

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex <= data.length) {
            const newData = data.slice(0, newIndex);
            setCurrentData(newData);
            // Update latest timestamp
            const latestDataPoint = newData[newData.length - 1];
            if (latestDataPoint) {
              setLatestTimestamp(latestDataPoint.name);
            }
          } else {
            setIsRunning(false); // Stop animation when all data points are shown
            clearInterval(interval);
          }
          console.log(index);
          return newIndex;
        });
      }, 1000); // Update every second
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartAnimation = () => {
    setIndex(0); // Reset index to start from the beginning
    setCurrentData([]); // Clear currentData to start over
    setLatestTimestamp(null); // Clear latest timestamp
    setIsRunning(true); // Start the animation
  };

  return (
    <div className="App">
      <h1>Link Chart</h1>
      <p>Latest Data Point Time: {latestTimestamp}</p>
      <MultiLineChart data={currentData} lines={lines} />
      {!isRunning && (
        <button onClick={handleStartAnimation}>Start Animation</button>
      )}
    </div>
  );
};

export default DataBreaches;

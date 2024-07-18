import React, { useState, useEffect } from "react";
import {
  DataBreachesSumedTypeByMonth,
  SumedTypeByMonthLinesColor,
  DataBreachesSumedLocationByMonth,
  SumedLocationByMonthLinesColor,
} from "../data/DataBreaches";
import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MultiLineChart, { DataPoint } from "../components/MultiLineChart";
import BackToHomeIcon from "../components/HomeIcon";

const DataBreachesByType: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [max, setMaxData] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false); // State to control animation
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null); // State to track latest timestamp

  const data = DataBreachesSumedTypeByMonth;
  const lines = SumedTypeByMonthLinesColor;

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
            const { Time, ...others } = latestDataPoint;
            const maxValue = Math.max(...Object.values(others));
            setMaxData(maxValue);
            if (latestDataPoint) {
              setLatestTimestamp(latestDataPoint.Time);
            }
          } else {
            setIsRunning(false); // Stop animation when all data points are shown
            clearInterval(interval);
          }
          console.log(index, latestTimestamp);
          return newIndex;
        });
      }, 150); // Update every second
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartAnimation = () => {
    setIndex(0); // Reset index to start from the beginning
    setCurrentData([]); // Clear currentData to start over
    setLatestTimestamp(null); // Clear latest timestamp
    setIsRunning(true); // Start the animation
  };

  const buttonStyle = {
    top: 0,
    left: 0,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box className="App" sx={{ width: "80%", paddingTop: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", spacing: 2 }}>
          <Typography variant="h6">
            Types of Data Breaches 2009 - 2021
          </Typography>
          {!isRunning && (
            <IconButton
              size="large"
              onClick={handleStartAnimation}
              sx={buttonStyle}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
        </Box>
        <MultiLineChart data={currentData} max={max} lines={lines} />
      </Box>
    </Box>
  );
};

const DataBreachesByLocation: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [max, setMaxData] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false); // State to control animation
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null); // State to track latest timestamp

  const data = DataBreachesSumedLocationByMonth;
  const lines = SumedLocationByMonthLinesColor;

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
            const { Time, ...others } = latestDataPoint;
            const maxValue = Math.max(...Object.values(others));
            setMaxData(maxValue);
            if (latestDataPoint) {
              setLatestTimestamp(latestDataPoint.Time);
            }
          } else {
            setIsRunning(false); // Stop animation when all data points are shown
            clearInterval(interval);
          }
          console.log(index, latestTimestamp);
          return newIndex;
        });
      }, 150); // Update every second
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartAnimation = () => {
    setIndex(0); // Reset index to start from the beginning
    setCurrentData([]); // Clear currentData to start over
    setLatestTimestamp(null); // Clear latest timestamp
    setIsRunning(true); // Start the animation
  };

  const buttonStyle = {
    top: 0,
    left: 0,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box className="App" sx={{ width: "80%", paddingTop: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", spacing: 2 }}>
          <Typography variant="h6">
            Location of Data Breaches 2009 - 2021
          </Typography>
          {!isRunning && (
            <IconButton
              size="large"
              onClick={handleStartAnimation}
              sx={buttonStyle}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
        </Box>
        <MultiLineChart data={currentData} max={max} lines={lines} />
      </Box>
    </Box>
  );
};

export default function DataBreaches() {
  const HomeStyle = {
    position: "fixed !important",
    bottom: "10px",
    left: "10px",
  };

  return (
    <>
      <BackToHomeIcon style={HomeStyle} />
      <DataBreachesByType />
      <DataBreachesByLocation />
    </>
  );
}

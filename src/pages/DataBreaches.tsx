import React, { useState, useEffect } from "react";
import {
  DataBreachesSumedTypeByMonth,
  SumedTypeByMonthLinesColor,
  DataBreachesSumedLocationByMonth,
  SumedLocationByMonthLinesColor,
} from "../data/DataBreaches";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MultiLineChart, { DataPoint } from "../components/MultiLineChart";
import BackToHomeIcon from "../components/HomeIcon";
import { gsap } from "gsap";

const DataBreachesByType: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [max, setMaxData] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isPause, setPause] = useState<boolean>(false);
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null);

  const data = DataBreachesSumedTypeByMonth;
  const lines = SumedTypeByMonthLinesColor;
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex <= data.length && !isPause) {
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
    if (!isPause) {
      setIndex(0);
      setCurrentData([]);
      setLatestTimestamp(null);
      setIsRunning(true);
    }
    if (isPause) {
      setPause(false);
      setIsRunning(true);
    }
  };

  const handlePauseAnimation = () => {
    setPause(true);
    setIsRunning(false);
  };

  const buttonStyle = {
    top: 0,
    left: 0,
  };

  /*Area for the animated texts */
  const Text = [
    {
      text: "Bitcoin was launched, built on blockchain, making transactions untrackable and anonymous. At the moment, most of the incidents resulted from physical theft.",
      duration: 8,
      delay: 1,
    },
    {
      text: "Bitcoin became extremely popular, later enabling hackers to use WannaCry ransomware to demand ransom without being easily tracked or caught.",
      duration: 8,
      delay: 1,
    },
    {
      text: "Hacking and IT incidents quickly became the severest incident type.",
      duration: 6,
      delay: 1,
    },
  ];

  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "2vw" : "1.4vw";
  const fontFamily = "Inter, sans-serif; Orbitron, sans-serif";

  useEffect(() => {
    let tlMaster = gsap.timeline();

    Text.forEach((word: any) => {
      const tlText = gsap.timeline({
        yoyo: false,
      });
      tlText
        .to("#animated_text", { duration: 0.5, opacity: 0 }) // Fade out current text
        .set("#animated_text", { text: word.text }) // Set new text
        .to("#animated_text", {
          duration: word.duration,
          opacity: 1,
        }); // Fade in new text
      tlMaster.add(tlText);
    });
    if (isRunning) {
      gsap.globalTimeline.resume();
    } else {
      gsap.globalTimeline.pause();
    }
    return () => {
      // Clean up the animation when the component unmounts
      tlMaster.kill();
    };
  }, [isRunning]);

  const Years = Array.from({ length: 13 }, (_, i) => 2009 + i);
  useEffect(() => {
    let tlMaster = gsap.timeline();

    Years.forEach((year: any) => {
      const tlText = gsap.timeline({
        yoyo: false,
      });
      tlText
        .set("#animated_year", { text: year }) // Set new text
        .to("#animated_year", {
          duration: 1.8,
          opacity: 1,
        }); // Fade in new text
      tlMaster.add(tlText);
    });
    if (isRunning) {
      gsap.globalTimeline.resume();
    } else {
      gsap.globalTimeline.pause();
    }
    return () => {
      // Clean up the animation when the component unmounts
      tlMaster.kill();
    };
  }, [isRunning]);

  /*Closed */

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box className="App" sx={{ width: "100%", paddingTop: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", spacing: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "90%" : "60%",
            }}
          >
            <Typography variant="h6" mb={2}>
              Types of Data Breaches in Healthcare System in the US (2009 -
              2021)
            </Typography>
            <Typography variant="body1" mb={2}>
              The chart shows the incidents of different types of data breaches
              from 2009 to 2021 in the healthcare system of the US. From the
              animation, we can see the rise of cryptocurrency facilitates the
              spread and implementation of ransomware like wannacry.
            </Typography>
            <Typography variant="body1" mb={2}>
              Since 2016, the deployment of cloud systems has also broadened the
              attack surface for hackers to penetrate a system. Then hacking and
              IT related incidents became the dominant type of data breaches
              since 2020.
            </Typography>
          </Box>
        </Box>

        {!isRunning && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Play</Typography>
            <IconButton
              size="medium"
              onClick={handleStartAnimation}
              sx={buttonStyle}
            >
              <PlayArrowIcon />
            </IconButton>
          </Box>
        )}
        {isRunning && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Pause</Typography>
            <IconButton
              size="medium"
              onClick={handlePauseAnimation}
              sx={buttonStyle}
            >
              <PauseIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ position: "relative" }}>
          <MultiLineChart data={currentData} max={max} lines={lines} />
          {/*Animated Texts*/}
          <Box
            sx={{
              width: "100%",
              //height: isDevice ? "600px" : "800px",
              display: "flex",
              p: 10,
              //paddingTop: 40,
              position: "absolute",
              top: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box id="textArea" sx={{ width: "50%" }}>
              <Typography
                id="animated_year"
                fontSize={fontSize}
                paddingBottom={5}
                fontFamily={fontFamily}
              ></Typography>
              <Typography
                id="animated_text"
                display="inline"
                fontSize={fontSize}
                fontFamily={fontFamily}
              ></Typography>
            </Box>
          </Box>
          {/*Closed */}
        </Box>
      </Box>
    </Box>
  );
};

const DataBreachesByLocation: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [max, setMaxData] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPause, setPause] = useState<boolean>(false);
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null);

  const data = DataBreachesSumedLocationByMonth;
  const lines = SumedLocationByMonthLinesColor;
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    if (!isPause) {
      setIndex(0);
      setCurrentData([]);
      setLatestTimestamp(null);
      setIsRunning(true);
    }
    if (isPause) {
      setPause(false);
      setIsRunning(true);
    }
  };

  const handlePauseAnimation = () => {
    setPause(true);
    setIsRunning(false);
  };

  const buttonStyle = {
    top: 0,
    left: 0,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box className="App" sx={{ width: "100%", paddingTop: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", spacing: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "90%" : "60%",
            }}
          >
            <Typography variant="h6" mb={2}>
              Locations of Data Breaches in Healthcare System in the US (2009 -
              2021)
            </Typography>
            <Typography variant="body1" mb={2}>
              The chart shows the locations of cybersecurity incidents from 2009
              to 2021 in the healthcare system of the US. From the animation, we
              can see the physical data breaches have shifted toward digital and
              virtual ones.
            </Typography>
            <Typography variant="body1" mb={2}>
              Since 2016, the locations of data breaches may result from
              vulnerabilities of digital system. Also, the deployment of
              cloud-based system may also increase the risk. Furthermore, the
              WannaCry virus hidden in OS updates have also caused great loss
              then. Finally, the email evasdropping or phishing attacks became
              notorious in recent years, which may also affect the trend of
              locations.
            </Typography>
          </Box>
        </Box>
        {!isRunning && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Play</Typography>
            <IconButton
              size="medium"
              onClick={handleStartAnimation}
              sx={buttonStyle}
            >
              <PlayArrowIcon />
            </IconButton>
          </Box>
        )}
        {isRunning && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Pause</Typography>
            <IconButton
              size="medium"
              onClick={handlePauseAnimation}
              sx={buttonStyle}
            >
              <PauseIcon />
            </IconButton>
          </Box>
        )}

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
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Box paddingY={20} paddingX={isMobile ? 2 : 10}>
        <BackToHomeIcon style={HomeStyle} />
        <Typography variant="h5" fontWeight={500}>
          Data Visualization Playground of Cybersecurity
        </Typography>
        <DataBreachesByType />
        <DataBreachesByLocation />
      </Box>
    </>
  );
}

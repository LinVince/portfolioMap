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
      text: "Before Bitcoin was launched and became popular, most of the data breaches resulted from physical theft.",
      duration: 8,
      delay: 0,
    },
    {
      text: "After Bitcoin became extremely popular, hackers leveraged its anonymity and untrackability to spread WannaCry ransomware.",
      duration: 7,
      delay: 0,
    },

    {
      text: "Till now, hacking and IT incidents has become the severest incident type.",
      duration: 6,
      delay: 1,
    },
  ];

  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "4vw" : "1.4vw";
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
      tlMaster.play();
    } else {
      tlMaster.pause();
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
      tlMaster?.play();
    } else {
      tlMaster?.pause();
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
              animation, we can see the in the decade, Hacking/IT incidents has
              risen and become the severest data breach type.
            </Typography>
            <Typography variant="body1" mb={2}>
              The surge could result from Bitcoin. Since 2015, Bitcoin has
              become popular, and the hackers leveraged its anonymity and
              untrackability to kidnap hospitals' computers and demand ransom
              via WannaCry ransomware.
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
          {/*Animated Texts*/}
          <Box
            sx={{
              width: "100%",
              //height: isDevice ? "600px" : "800px",
              display: "flex",
              p: isDevice ? 0 : 10,
              //paddingTop: 40,
              position: isDevice ? "relative" : "absolute",
              top: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box id="textArea" sx={{ width: isDevice ? "100%" : "50%" }}>
              <Typography
                id="animated_year"
                fontSize={fontSize}
                paddingBottom={isDevice ? 1 : 5}
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
          <MultiLineChart data={currentData} max={max} lines={lines} />
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

  /*Area for the animated texts */
  const Text = [
    {
      text: "The same applies to the location of the data breaches.",
      duration: 5,
      delay: 0,
    },
    {
      text: "Data loss tended to occur physically as hacking through the Internet to demand ransom would leave transaction records...until Bitcoin was invented.",
      duration: 9,
      delay: 0,
    },

    {
      text: "Now, ransomware and email phishing through network are the primary data breach type.",
      duration: 6,
      delay: 1,
    },
  ];

  const isDevice = useMediaQuery("(max-width:600px)");
  const fontSize = isDevice ? "4vw" : "1.4vw";
  const fontFamily = "Inter, sans-serif; Orbitron, sans-serif";

  useEffect(() => {
    let tlMaster = gsap.timeline();

    Text.forEach((word: any) => {
      const tlText = gsap.timeline({
        yoyo: false,
      });
      tlText
        .to("#animated_text_2", { duration: 0.5, opacity: 0 }) // Fade out current text
        .set("#animated_text_2", { text: word.text }) // Set new text
        .to("#animated_text_2", {
          duration: word.duration,
          opacity: 1,
        }); // Fade in new text
      tlMaster.add(tlText);
    });
    if (isRunning) {
      tlMaster.resume();
    } else {
      tlMaster.pause();
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
        .set("#animated_year_2", { text: year }) // Set new text
        .to("#animated_year_2", {
          duration: 1.8,
          opacity: 1,
        }); // Fade in new text
      tlMaster.add(tlText);
    });
    if (isRunning) {
      tlMaster.resume();
    } else {
      tlMaster.pause();
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
        <Box sx={{ position: "relative" }}>
          {/*Animated Texts*/}
          <Box
            sx={{
              width: "100%",
              //height: isDevice ? "600px" : "800px",
              display: "flex",
              p: isDevice ? 0 : 10,
              //paddingTop: 40,
              position: isDevice ? "relative" : "absolute",
              top: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box id="textArea" sx={{ width: isDevice ? "100%" : "50%" }}>
              <Typography
                id="animated_year_2"
                fontSize={fontSize}
                paddingBottom={isDevice ? 1 : 5}
                fontFamily={fontFamily}
              ></Typography>
              <Typography
                id="animated_text_2"
                display="inline"
                fontSize={fontSize}
                fontFamily={fontFamily}
              ></Typography>
            </Box>
          </Box>
          {/*Closed */}

          <MultiLineChart data={currentData} max={max} lines={lines} />
        </Box>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "90%" : "60%",
          }}
        >
          <Typography variant="h5" fontWeight={500} mb={2}>
            Bitcoin Contributed to Network-based Data Breaches in Healthcare
            Systems
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            In the past, data breaches in the healthcare systems, such as
            hospitals, occurred through physical theft or laptop/computer
            unauthorized access. From hackers' point of view, using any other
            means through the Internet may not help make profits becasue the
            transactions would be monitored, and the police would track the
            record and discover their identities.
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            However, the birth of Bitcoin changed the game. With Bitcoin,
            hackers can receive money without being easily tracked and caught
            because it is anonymous and untrackable. Since then, network-based
            data breaches have risen to become the most frequent data breach
            type.
          </Typography>
          <Typography variant="body1" mb={2}>
            Data source:
            https://www.kaggle.com/datasets/archangell/hipaa-breaches-from-20092017
          </Typography>
        </Box>
        <DataBreachesByType />
        <DataBreachesByLocation />
      </Box>
    </>
  );
}

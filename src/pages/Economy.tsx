import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { HorizontalBarChart, BasicLever } from "../components/D3_Charts";
import { India_CPI_Rural, India_CPI_Urban } from "../data/IndianCPI";
import { useEffect, useState } from "react";
import {
  India_CPI_Urban_bytime,
  India_CPI_Urban_bytime_LinesColor,
} from "../data/IndianCPI";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { MultiLineChart, DataPoint } from "../components/D3_Charts";
import BackToHomeIcon from "../components/HomeIcon";
import { gsap } from "gsap";

const IndiaCPIUrbanBytime: React.FC = () => {
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [max, setMaxData] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isPause, setPause] = useState<boolean>(false);
  const [latestTimestamp, setLatestTimestamp] = useState<string | null>(null);

  const data = India_CPI_Urban_bytime;
  const lines = India_CPI_Urban_bytime_LinesColor;
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

  //const isDevice = useMediaQuery("(max-width:600px)");
  //const fontSize = isDevice ? "4vw" : "1.4vw";
  //const fontFamily = "Inter, sans-serif; Orbitron, sans-serif";

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
              Consumer Price Index in India by Categories (2013 - 2023)
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
          {/*Animated Texts
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
          Closed */}
          <MultiLineChart
            data={currentData}
            max={max}
            lines={lines}
            startingYpoint={80}
            maxPlus={40}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default function Economy() {
  const HomeStyle = {
    position: "fixed !important",
    bottom: "10px",
    left: "10px",
  };

  interface IndiaCPIProps {
    Date: string;
    Data: { name: string; value: number }[];
  }

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [index, setIndex] = useState(0);
  const [currentData, setData] = useState<IndiaCPIProps>(
    India_CPI_Urban[index]
  );
  const [subData, setSubData] = useState<IndiaCPIProps>(India_CPI_Rural[index]);

  const marks = India_CPI_Urban.map((d, idx) => ({
    value: idx,
    label: d.Date.slice(-6) === "-01-01" ? d.Date.slice(0, 4) : "",
  }));

  useEffect(() => {
    setData(India_CPI_Urban[index]);
    setSubData(India_CPI_Rural[index]);
  }, [index]);

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
            Consumer Price Index (CPI) in India
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            The Consumer Price Index (CPI) is a key economic indicator that
            measures the average change over time in the prices paid by urban
            consumers for a basket of goods and services. In India, CPI is used
            to gauge inflation and reflect the cost of living for households.
            The CPI basket includes various categories such as food and
            beverages, housing, clothing, and transportation, which are weighted
            according to their importance in the typical consumer's expenditure.
            The CPI is calculated monthly by the Ministry of Statistics and
            Programme Implementation (MOSPI), and it plays a crucial role in
            adjusting wages, pensions, and social benefits to maintain
            purchasing power.
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            Insights from CPI data in India can provide valuable information for
            policymakers, businesses, and consumers. For policymakers, CPI
            trends help in formulating monetary policies and setting interest
            rates to control inflation. Businesses can use CPI data to adjust
            pricing strategies, manage costs, and forecast financial
            performance. For consumers, CPI serves as an indicator of
            inflationary pressure, helping them make informed decisions about
            spending and saving. A rising CPI suggests increased living costs,
            which can impact household budgets and purchasing decisions.
            Conversely, a stable or declining CPI can indicate more favorable
            economic conditions and greater consumer purchasing power.
          </Typography>
          <Link href="https://www.kaggle.com/datasets/satyampd/consumer-price-index-india-inflation-data">
            Data Source
          </Link>
        </Box>
        <IndiaCPIUrbanBytime />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "90%" : "60%",
          }}
        >
          <Typography variant="body1" fontWeight={600} mt={5} mb={2}>
            Why is the category "Vegetable" fluctuate so much?
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            We can see the CPI of vegetables rocketed especially in summer. You
            can also use the lever below to check the CPI value in August. Many
            news reports mentioning the rise is due to severe weather conditions
            or droughts. It has become an expected phenomenon that the price of
            vegetables tends to rise in the summer.
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            <Link
              target="_blank"
              href="https://money.usnews.com/investing/news/articles/2024-07-09/india-inflation-seen-up-in-june-due-to-soaring-vegetable-prices-reuters-poll"
            >
              Relevant Article
            </Link>
          </Typography>
          <Typography variant="body1" fontWeight={600} mt={5} mb={2}>
            Why does the category "Meat and Fish" rise and almost double since
            2018?
          </Typography>
          <Typography variant="body1" fontWeight={400} mb={2}>
            Please use the lever and switch the date to 2018 - 2023. We can see
            the category "Meat and Fish" has risen to become the top 2 items
            with the highest CPI value. According to some reports, it may be due
            to the rising incomes, changing diets. There are also more and more
            middle-class families. The situation leads to the rise of the demand
            for fishes and meat.
          </Typography>
          <Link href="https://agronfoodprocessing.com/rising-incomes-and-shifting-diets-propel-a-surge-in-fish-consumption-across-india/">
            Relevant Article
          </Link>
        </Box>
        <BasicLever
          value={index}
          setValue={setIndex}
          marks={marks}
          displayUnit="Date"
          displayValue={currentData.Date}
          style={{ my: 10 }}
        />
        <Typography variant="body1" fontWeight={500} mb={2} textAlign="center">
          Urban Areas
        </Typography>
        <HorizontalBarChart data={currentData.Data} />
        <Typography variant="body1" fontWeight={500} mb={2} textAlign="center">
          Rural Areas
        </Typography>
        <HorizontalBarChart data={subData.Data} />
      </Box>
    </>
  );
}

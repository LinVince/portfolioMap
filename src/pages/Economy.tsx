import { Box, Typography, useMediaQuery } from "@mui/material";
import BackToHomeIcon from "../components/HomeIcon";
import { HorizontalBarChart, BasicLever } from "../components/D3_Charts";
import { India_CPI } from "../data/IndianCPI";
import { useEffect, useState } from "react";

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
  const [currentData, setData] = useState<IndiaCPIProps>(India_CPI[index]);

  const marks = India_CPI.map((d, idx) => ({
    value: idx,
    label: d.Date.slice(-6) === "-01-01" ? d.Date.slice(0, 4) : "",
  }));

  useEffect(() => {
    setData(India_CPI[index]);
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
          <Typography variant="body1" mb={2}>
            Data source:
            https://www.kaggle.com/datasets/satyampd/consumer-price-index-india-inflation-data
          </Typography>
        </Box>
        <BasicLever
          value={index}
          setValue={setIndex}
          marks={marks}
          displayUnit="Date"
          displayValue={currentData.Date}
        />
        <HorizontalBarChart data={currentData.Data} />
      </Box>
    </>
  );
}

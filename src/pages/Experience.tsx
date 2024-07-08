import React, { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
  timelineOppositeContentClasses,
} from "@mui/lab";
import {
  useMediaQuery,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import Experience from "../data/Experience";

const experiences = Experience;
const iconMapping: { [key: string]: React.ElementType | null } = {
  work: WorkIcon,
  school: SchoolIcon,
  empty: null,
};

const ExperiencePage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <animated.div style={{ ...props, padding: "20px" }}>
      <Typography
        style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto" }}
        align={isMobile ? "left" : "center"}
        gutterBottom
      >
        Experience
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: isMobile ? 0 : 0.2,
          },
        }}
      >
        {experiences.map((exp, index) => {
          const IconComponent = iconMapping[exp.icon];
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {exp.date}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color="primary"
                  style={
                    {
                      /*
                    animation:
                      hoveredIndex === index
                        ? "spin 2s linear infinite"
                        : "none",
                  */
                    }
                  }
                >
                  {IconComponent && <IconComponent />}
                </TimelineDot>
                {index < experiences.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  style={{
                    width: isMobile ? "100%" : "70%",
                    marginBottom: "50px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    setHoveredIndex(index);
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    setHoveredIndex(null);
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Typography variant="h6" component="h1">
                    {exp.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {exp.company}
                  </Typography>
                  <Typography>{exp.description}</Typography>
                  <Card sx={{ p: "20px", marginTop: "20px", width: "100%" }}>
                    {exp.media &&
                      exp.media.map((mediaItem, mediaIndex) => (
                        <div key={mediaIndex}>
                          <CardContent sx={{ marginTop: "10px" }}>
                            <Typography
                              color="textSecondary"
                              fontSize={16}
                              fontWeight={600}
                              textAlign="left"
                            >
                              {mediaItem.title}
                            </Typography>
                          </CardContent>
                          {mediaItem.type === "image" && (
                            <CardMedia
                              component="img"
                              alt={mediaItem.description}
                              width="100%"
                              height="auto"
                              image={mediaItem.src}
                              sx={{
                                objectFit: "contain",
                              }}
                            />
                          )}
                          {mediaItem.type === "iframe" && (
                            <CardMedia
                              component="iframe"
                              src={mediaItem.src}
                              sx={{
                                border: "0px",
                                width: "100%",
                                height: isMobile ? "100%" : "400px",
                              }}
                            />
                          )}
                          {mediaItem.type === "video" && (
                            <CardMedia
                              component="video"
                              controls
                              height="300"
                              src={mediaItem.src}
                              sx={{ width: "100%" }}
                            />
                          )}
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              textAlign="left"
                            >
                              {mediaItem.description}
                            </Typography>
                          </CardContent>
                        </div>
                      ))}
                  </Card>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </animated.div>
  );
};

export default ExperiencePage;

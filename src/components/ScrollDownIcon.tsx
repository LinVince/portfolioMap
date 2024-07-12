// ScrollDownIcon.tsx

import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { animateScroll as scroll } from "react-scroll";

const ScrollDownIcon: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShow(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    scroll.scrollToBottom({
      smooth: true,
      duration: 500,
    });
  };

  return (
    <IconButton
      onClick={scrollToContent}
      style={{
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: show ? 1 : 0,
        transition: "opacity 0.3s ease",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(5px)",
      }}
      color="primary"
      aria-label="scroll down"
    >
      <ArrowDownwardIcon fontSize="small" />
    </IconButton>
  );
};

export default ScrollDownIcon;

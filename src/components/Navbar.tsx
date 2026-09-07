import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const darkMode = useSelector((state: any) => state.darkMode);
  const logoPath = darkMode
    ? "../image/logoYueh_dark.png"
    : "../image/logoYueh.png";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Map", path: "/portfolioMap" },
    { label: "Gallery", path: "/portfolioGallery" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
          backgroundColor: "var(--paper)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
            borderBottom: "1px solid var(--rule)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
              color: "var(--ink)",
          }}
        >
          Portfolio
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ p: 0 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={isActive(item.path)}
              sx={{
                py: 1.5,
                px: 2,
                borderLeft: isActive(item.path)
                    ? "4px solid var(--signal)"
                  : "4px solid transparent",
                backgroundColor: isActive(item.path)
                    ? "var(--paper-deep)"
                  : "transparent",
                "&:hover": {
                    backgroundColor: "var(--paper-deep)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: isActive(item.path) ? 700 : 500,
                      color: isActive(item.path) ? "var(--ink)" : "var(--muted-ink)",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
            backgroundColor: "rgba(244, 241, 232, 0.94)",
            color: "var(--ink)",
            boxShadow: "none",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--rule)",
          zIndex: 1200,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: { xs: 0, sm: 2 },
            }}
          >
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
                height: "60px",
              }}
            >
              <img
                src={logoPath}
                alt="Yueh Logo"
                style={{
                  height: isMobile ? "50px" : "60px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? "#0d47a1" : "#1a4d7a",
                      fontWeight: isActive(item.path) ? 700 : 500,
                      fontSize: "0.95rem",
                      px: 2,
                      py: 1,
                      textTransform: "none",
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "3px",
                          background: "var(--signal)",
                        borderRadius: "2px",
                        transform: isActive(item.path)
                          ? "scaleX(1)"
                          : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover": {
                        color: "#0d47a1",
                        "&::after": {
                          transform: "scaleX(1)",
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ color: "#0d47a1" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;

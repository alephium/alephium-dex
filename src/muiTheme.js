import { createTheme, responsiveFontSizes } from "@material-ui/core";

export const COLORS = {
  primary: "#ff5722",
  primaryWithTransparency: "rgba(255, 87, 34, 0.8)",
  secondary: "#4caf50",
  secondaryWithTransparency: "rgba(76, 175, 80, 0.8)",
  background: "#fafafa",
  divider: "#bdbdbd",
  text: "#212121",
  error: "#e91e63",
};

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      background: {
        default: COLORS.background,
        paper: COLORS.background,
      },
      divider: COLORS.divider,
      text: {
        primary: COLORS.text,
      },
      primary: {
        main: COLORS.primaryWithTransparency,
        light: COLORS.primary,
      },
      secondary: {
        main: COLORS.secondaryWithTransparency,
        light: COLORS.secondary,
      },
      error: {
        main: COLORS.error,
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: {
        fontWeight: "bold",
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: "bold",
        fontSize: "2rem",
      },
      h4: {
        fontWeight: "600",
        fontSize: "1.5rem",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: `${COLORS.divider} ${COLORS.background}`,
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
            backgroundColor: COLORS.background,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: COLORS.divider,
            borderRadius: "4px",
          },
          "*::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
      MuiAccordion: {
        root: {
          backgroundColor: COLORS.background,
          "&:before": {
            display: "none",
          },
        },
        rounded: {
          "&:first-child": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
          "&:last-child": {
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          },
        },
      },
      MuiAlert: {
        root: {
          borderRadius: "8px",
          border: "1px solid",
        },
      },
      MuiButton: {
        root: {
          borderRadius: "8px",
          textTransform: "uppercase",
        },
      },
      MuiLink: {
        root: {
          color: COLORS.primary,
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: "8px",
        },
      },
      MuiStepper: {
        root: {
          backgroundColor: "transparent",
          padding: 0,
        },
      },
      MuiStep: {
        root: {
          backgroundColor: COLORS.background,
          borderRadius: "8px",
          padding: 16,
        },
      },
      MuiStepConnector: {
        lineVertical: {
          borderLeftWidth: 0,
        },
      },
      MuiStepContent: {
        root: {
          borderLeftWidth: 0,
        },
      },
      MuiStepLabel: {
        label: {
          fontSize: 18,
          fontWeight: "500",
          "&.MuiStepLabel-active": {
            fontWeight: "600",
          },
          "&.MuiStepLabel-completed": {
            fontWeight: "600",
          },
        },
      },
      MuiTab: {
        root: {
          fontSize: 20,
          fontWeight: "500",
          padding: 16,
          textTransform: "uppercase",
        },
      },
    },
  })
);

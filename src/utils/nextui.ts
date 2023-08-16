import { createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      // background: "#5e3622",
      // #22201e, #221e1e, #2d231e, #7d4800, #744505
      // #251b3e96
      // Brown: #322b29
      // Gold: #764813
      primaryLight: "$purple400",
      primary: "$purple500",
      secondary: "$gray200",
      primaryDark: "$gray900",
      gradient: "180deg, $purple300 50%, $purple500 -20%",
      warningLightContrast: "rgba(245, 158, 11, 1)",
      link: "#5E1DAD",
      text: "#e3e3e3",
      selection: "#bc6123",
    },
    space: {},
    fonts: {},
  },
});

export default theme;

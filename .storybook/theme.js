import { create } from "@storybook/theming/create";
import logo from "./logo.png";

export default create({
  base: "light",
  brandImage: logo,
  brandUrl: "https://style.monday.com", // TODO set brand url
  barSelectedColor: "#5034ff",
  brandTitle: "Monday UI style",
  background: {
    hoverable: "rgba(80, 52, 255, 0.1)",
  },
  hoverable: "rgba(80, 52, 255, 0.1)",
});

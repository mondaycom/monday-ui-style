import ColorsDescription from "../colors-description/colors-description";

const colorKeys = [
  "primary-color",
  "primary-hover-color",
  "primary-selected-color",
  "primary-selected-hover-color",
  "positive-color",
  "positive-color-hover",
  "positive-color-selected",
  "positive-color-selected-hover",
  "negative-color",
  "negative-color-hover",
  "negative-color-selected",
  "negative-color-selected-hover",
  "warning-color",
  "warning-color-hover",
  "warning-color-selected",
  "warning-color-selected-hover",
  "private-color",
  "shareable-color",
  "inverted-color-background",
  "icon-color",
];

export const SemanticColors = () => <ColorsDescription colorNames={colorKeys} />;

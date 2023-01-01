export type ButtonColor = "yellow" | "black";

export type ButtonColorSet = {
  base: string;
  topBorder: string;
  bottomBorder: string;
  corner: string;
};

export const ButtonColors: Record<ButtonColor, ButtonColorSet> = {
  yellow: {
    base: "#eec408",
    topBorder: "#fbeb44",
    bottomBorder: "#a6532b",
    corner: "#faf99b",
  },
  black: {
    base: "#343C50",
    topBorder: "#6B5D83",
    bottomBorder: "#262C3C",
    corner: "#7A6C96",
  },
};

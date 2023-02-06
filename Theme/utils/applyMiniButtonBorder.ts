import { ButtonColor, ButtonColors, ButtonColorSet } from "Theme/Colors";

export function applyMiniButtonBorder() {
  return ({ color }: { color: ButtonColor }) =>
    `background: linear-gradient(180deg, ${ButtonColors[color].topBorder} 0%, ${ButtonColors[color].bottomBorder} 100%);`;
}

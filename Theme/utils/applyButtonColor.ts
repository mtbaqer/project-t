import { ButtonColor, ButtonColors, ButtonColorSet } from "Theme/Colors";

export function applyButtonColor(key: keyof ButtonColorSet) {
  return ({ color }: { color: ButtonColor }) => `background-color: ${ButtonColors[color][key]};`;
}

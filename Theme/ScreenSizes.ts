export const Breakpoints = {
  small: 640,
  medium: 768,
  large: 1024,
};

export const ScreenSizes = {
  small: `@media (max-width: ${Breakpoints.small}px)`,
  medium: `@media (max-width: ${Breakpoints.medium}px)`,
  large: `@media (max-width: ${Breakpoints.large}px)`,
  biggerThanSmall: `@media (min-width: ${Breakpoints.small + 1}px)`,
  biggerThanMedium: `@media (min-width: ${Breakpoints.medium + 1}px)`,
  biggerThanLarge: `@media (min-width: ${Breakpoints.large + 1}px)`,
};

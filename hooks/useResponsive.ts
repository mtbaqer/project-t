import { useMediaQuery } from "react-responsive";
import { Breakpoints } from "../Theme/ScreenSizes";

export default function useResponsive() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: Breakpoints.medium });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: Breakpoints.medium });

  return { isTabletOrMobile, isDesktopOrLaptop };
}

import { DEVICE_SIZE } from "@/constants/constants";
import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width } = useWindowDimensions();

  const isMobile = width < DEVICE_SIZE.tablet;
  const isTablet = width >= DEVICE_SIZE.tablet && width < DEVICE_SIZE.desktop;
  const isDesktop = width >= DEVICE_SIZE.desktop;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  };
}

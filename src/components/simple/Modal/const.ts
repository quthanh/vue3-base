export const SIZE: Record<string, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  default: "max-w-[600px]",
  small: "max-w-[400px]",
  large: "max-w-[900px]",
  "extra-large": "max-w-[1200px]",
};

export const POSITION: Record<string, string> = {
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "center-left": "top-1/2 left-0 -translate-y-1/2",
  center: "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
  "center-right": "top-1/2 right-0 -translate-y-1/2",
};

export const POSITION_CONTENT: Record<string, string> = {
  "bottom-left": "justify-start items-end",
  "bottom-right": "justify-end items-end",
  "bottom-center": "justify-center items-end",
  "top-left": "justify-start items-start",
  "top-center": "justify-center items-start",
  "top-right": "justify-end items-start",
  "center-left": "justify-start items-center",
  center: "justify-center items-center",
  "center-right": "justify-end items-center",
};

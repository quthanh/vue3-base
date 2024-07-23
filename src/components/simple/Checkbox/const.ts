export const INPUT_SIZE: Record<string, string> = {
  small: "h-4 w-4 checked:after:h-[0.625rem] checked:after:w-[0.25rem]",
  default: "h-6 w-6 checked:after:h-[0.825rem] checked:after:w-[0.375rem]",
  large: "h-6 w-6 checked:after:h-[0.825rem] checked:after:w-[0.375rem]",
};

export const LABEL_SIZE: Record<string, string> = {
  small: "text-gray-900 text-sm",
  default: "text-gray-900 text-base",
  large: "text-gray-900 text-base",
};

export const VARIANT: Record<string, string> = {
  primary:
    "accent-blue-600 checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600",
  secondary:
    "accent-gray-600 checked:border-gray-300 checked:bg-gray-200 indeterminate:border-gray-300 indeterminate:bg-gray-200",
  danger:
    "accent-red-600 checked:bg-red-500 checked:bg-red-100 indeterminate:bg-red-500 indeterminate:bg-red-100",
  error:
    "accent-red-500 checked:border-red-500 checked:bg-red-500 indeterminate:border-red-500 indeterminate:bg-red-500",
  warning:
    "accent-yellow-600 checked:bg-yellow-500 checked:bg-yellow-100 indeterminate:bg-yellow-500 indeterminate:bg-yellow-100",
  success:
    "accent-green-600 checked:bg-green-500 checked:bg-green-100 indeterminate:bg-green-500 indeterminate:bg-green-100",
};

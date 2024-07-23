export const INPUT_SIZE: Record<string, string> = {
  small: 'w-11 h-6 after:h-5 after:w-5 after:left-[2px]',
  default:
    'w-16 h-8 after:h-7 after:w-7 after:left-[2px] peer-checked:after:left-[6px]',
  large:
    'w-20 h-10 after:h-9 after:w-9 after:left-[2px] peer-checked:after:left-[6px]',
};

export const LABEL_SIZE: Record<string, string> = {
  small: 'text-sm font-medium text-gray-900',
  default: 'text-base font-medium text-gray-900',
  large: 'text-base font-medium text-gray-900',
};

export const VARIANT: Record<string, string> = {
  primary: 'peer-checked:bg-blue-600',
  secondary: 'peer-checked:bg-gray-200',
  danger: 'peer-checked:bg-red-100',
  error: 'peer-checked:bg-red-100',
  warning: 'peer-checked:bg-yellow-100',
  success: 'peer-checked:bg-green-100',
};

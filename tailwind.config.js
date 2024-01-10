/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: {
        100: '#FEB74D',
        300: '#FDAD33',
        500: '#FDA21A',
        700: '#FD9800',
        900: '#CA7A00'
      },
      secondary: {
        100: '#9A99D7',
        300: '#6866C3',
        500: '#3632AF',
        700: '#04009C',
        900: '#03007C'
      },
      neutral: {
        50: '#F5F5F5',
        100: '#D9D9D9',
        300: '#BABABA',
        500: '#929292',
        700: '#6B6B6B',
        900: '#444444'
      },
      shade: {
        dark: '#120B00',
        light: '#FFFFFF'
      },
      feedback: {
        error: '#FF9494',
        success: '#4BB543',
        warning: 'FF6700'
      }
    },
    keyframes: {
      slideInFromLeft: {
        '0%': {
          transform: 'translateX(-100%)',
          opacity: '0'
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1'
        }
      },
      slideInFromRight: {
        '0%': {
          transform: 'translateX(0)',
          opacity: '0'
        },
        '100%': {
          transform: 'translateX(-100%)',
          opacity: '1'
        }
      }
    },
    animation: {
      slideInFromLeft: 'slideInFromLeft 0.5s ease-out',
      slideInFromRight: 'slideInFromRight 0.5s ease-out'
    }
  }
};
export const plugins = ['@tailwindcss/forms'];

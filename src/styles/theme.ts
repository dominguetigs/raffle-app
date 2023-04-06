import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: '#b6bcc9',
      200: '#8690a6',
      300: '#556382',
      400: '#304167',
      500: '#0c204c',
      600: '#0a1c45',
      700: '#08183c',
      800: '#061333',
      900: '#061333',
    },
  },
  fonts: {
    heading: 'Lato, sans-serif',
    body: 'Lato, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.500',
        color: '#ffffff',
      },
    },
  },
});

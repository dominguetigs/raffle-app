import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { RaffleRegisterProvider } from '@r/hooks/useRaffleRegister';

import { theme } from '@r/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RaffleRegisterProvider>
        <Component {...pageProps} />
      </RaffleRegisterProvider>
    </ChakraProvider>
  );
}

import { createContext, ReactNode, useContext, useState } from 'react';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

interface RaffleRegisterProps {
  children: ReactNode;
}

type RaffleRegisterContextData = {
  disclosure: UseDisclosureReturn;

  currentCardNumber: string | undefined;
  openRegister: (cardNumber: string) => void;
};

const RaffleRegisterContext = createContext({} as RaffleRegisterContextData);

export const RaffleRegisterProvider = ({ children }: RaffleRegisterProps): JSX.Element => {
  const disclosure = useDisclosure();

  const [currentCardNumber, setCurrentCardNumber] = useState<string>();

  function openRegister(cardNumber: string): void {
    setCurrentCardNumber(cardNumber);
    disclosure.onOpen();
  }

  return (
    <RaffleRegisterContext.Provider value={{ disclosure, currentCardNumber, openRegister }}>
      {children}
    </RaffleRegisterContext.Provider>
  );
};

export const useRaffleRegister = (): RaffleRegisterContextData => useContext(RaffleRegisterContext);

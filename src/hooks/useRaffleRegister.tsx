import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

import { Data } from '@r/pages/api/staticdata';

interface RaffleRegisterProps {
  children: ReactNode;
}

type RaffleRegisterContextData = {
  disclosure: UseDisclosureReturn;
  currentCardNumber: string | undefined;
  selectedNumbers: Data;
  openRegister: (cardNumber: string) => void;
  save: (data: Data) => void;
};

const API_URL = '/api/staticdata';

const RaffleRegisterContext = createContext({} as RaffleRegisterContextData);

export const RaffleRegisterProvider = ({ children }: RaffleRegisterProps): JSX.Element => {
  const disclosure = useDisclosure();

  const [selectedNumbers, setSelectedNumbers] = useState<Data>({});

  const [currentCardNumber, setCurrentCardNumber] = useState<string>();

  async function retrieveSelectedNumbers(): Promise<void> {
    try {
      const result = await fetch(API_URL);
      const data = await result.json();
      setSelectedNumbers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function save(requestData: Data): Promise<void> {
    try {
      const result = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await result.json();
      setSelectedNumbers(data);
    } catch (error) {
      console.error(error);
    }
  }

  function openRegister(cardNumber: string): void {
    setCurrentCardNumber(cardNumber);
    disclosure.onOpen();
  }

  useEffect(() => {
    retrieveSelectedNumbers();
  }, []);

  return (
    <RaffleRegisterContext.Provider
      value={{ disclosure, currentCardNumber, selectedNumbers, openRegister, save }}
    >
      {children}
    </RaffleRegisterContext.Provider>
  );
};

export const useRaffleRegister = (): RaffleRegisterContextData => useContext(RaffleRegisterContext);

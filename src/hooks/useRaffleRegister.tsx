import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

interface RaffleRegisterProps {
  children: ReactNode;
}

type RaffleRegisterContextData = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const RaffleRegisterContext = createContext({} as RaffleRegisterContextData);

export const RaffleRegisterProvider = ({ children }: RaffleRegisterProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <RaffleRegisterContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </RaffleRegisterContext.Provider>
  );
};

export const useRaffleRegister = (): RaffleRegisterContextData => useContext(RaffleRegisterContext);

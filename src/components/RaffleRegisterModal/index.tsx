import { useEffect, useState } from 'react';

import {
  Badge,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

export const RaffleRegisterModal = (): JSX.Element => {
  const { disclosure, currentCardNumber, selectedNumbers, save } = useRaffleRegister();

  const [name, setName] = useState<string>('');

  const { isOpen, onClose } = disclosure;

  function handleSave(): void {
    return;
    save({ [currentCardNumber]: name });
    onClose();
  }

  useEffect(() => {
    setName(selectedNumbers[currentCardNumber] || '');
  }, [currentCardNumber]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Número escolhido: <Badge>{currentCardNumber}</Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              colorScheme="brand"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="brand" onClick={() => handleSave()}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import {
  Badge,
  Button,
  FormControl,
  FormLabel,
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
  const { disclosure, currentCardNumber } = useRaffleRegister();

  const { isOpen, onClose } = disclosure;

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
            <Input placeholder="Nome" colorScheme="brand" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="brand">Salvar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

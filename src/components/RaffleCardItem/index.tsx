import { GridItem, Popover, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

import { RaffleCardItemRegister } from '../RaffleCardItemRegister';

interface RaffleCardItemProps {
  cardNumber: number;
  cardDimension: number;
  cardFontSize: number;
}

export const RaffleCardItem = ({
  cardNumber,
  cardDimension,
  cardFontSize,
}: RaffleCardItemProps): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { isEditing, setIsEditing } = useRaffleRegister();

  function setCardNumber(n: number): string {
    const value = String(n + 1);
    return value.length === 1 ? value.padStart(2, '0') : value;
  }

  function handleOnOpen(): void {
    if (isEditing) {
      return;
    }

    setIsEditing(true);
    onOpen();
  }

  function handleOnClose(): void {
    setIsEditing(false);
    onClose();
  }

  return (
    <Popover isOpen={isOpen} onOpen={handleOnOpen} onClose={handleOnClose} closeOnBlur={false}>
      <PopoverTrigger>
        <GridItem
          key={cardNumber}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={`${cardDimension}px`}
          h={`${cardDimension}px`}
          bg="#7fa3d3"
          borderWidth="1px"
          borderColor="brand.300"
        >
          <Text as="span" fontSize={`${cardFontSize}px`}>
            {setCardNumber(cardNumber)}
          </Text>
        </GridItem>
      </PopoverTrigger>
      <RaffleCardItemRegister />
    </Popover>
  );
};

import { GridItem, Text } from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

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
  const { openRegister } = useRaffleRegister();

  function formatCardNumber(n: number): string {
    const value = String(n + 1);
    return value.length === 1 ? value.padStart(2, '0') : value;
  }

  const formattedCardNumber = formatCardNumber(cardNumber);

  return (
    <GridItem
      key={cardNumber}
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w={`${cardDimension}px`}
      h={`${cardDimension}px`}
      bg="#7fa3d3"
      borderWidth="1px"
      borderColor="brand.300"
      onClick={() => openRegister(formattedCardNumber)}
      transition="transform 0.25s ease"
      _hover={{
        transform: 'scale(1.1)',
        transition: 'transform 0.5s ease',
      }}
    >
      <Text as="span" fontSize={`${cardFontSize}px`}>
        {formattedCardNumber}
      </Text>
    </GridItem>
  );
};

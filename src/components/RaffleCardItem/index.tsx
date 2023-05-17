import { Box, Flex, GridItem, Text } from '@chakra-ui/react';

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
  const { selectedNumbers, openRegister } = useRaffleRegister();

  function formatCardNumber(n: number): string {
    const value = String(n + 1);
    return value.length === 1 ? value.padStart(2, '0') : value;
  }

  const formattedCardNumber = formatCardNumber(cardNumber);

  const selected = selectedNumbers[cardNumber + 1];

  return (
    <GridItem
      key={cardNumber}
      cursor="pointer"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w={`${cardDimension}px`}
      h={`${cardDimension}px`}
      bg="#7fa3d3"
      fontWeight={600}
      borderWidth="1px"
      borderColor="brand.300"
      onClick={() => /* openRegister(formattedCardNumber)*/ null}
      transition="transform 0.25s ease"
      _hover={{
        ...(!selected && { transform: 'scale(1.1)', transition: 'transform 0.5s ease' }),
      }}
    >
      {selected ? (
        <>
          <Box position="absolute" bg="rgba(8, 24, 60, .5)" w="100%" h="100%"></Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            color="rgba(134, 144, 166, .5)"
            fontWeight="thin"
          >
            <Text
              position="absolute"
              top={0}
              left={0}
              pl={1}
              as="span"
              fontSize={`${cardFontSize}px`}
              fontWeight={600}
            >
              {formattedCardNumber}
            </Text>
            <Text
              as="span"
              fontSize={`${cardFontSize - 2}px`}
              fontWeight={600}
              sx={{
                '-webkit-transform': 'rotate(-45deg)',
                '-moz-transform': 'rotate(-45deg)',
                '-ms-transform': 'rotate(-45deg)',
                '-o-transform': 'rotate(-45deg)',
                transform: 'rotate(-45deg)',
              }}
            >
              {selected}
            </Text>
          </Box>
        </>
      ) : (
        <Flex align="center" justify="center">
          <Text as="span" fontSize={`${cardFontSize}px`}>
            {formattedCardNumber}
          </Text>
        </Flex>
      )}
    </GridItem>
  );
};

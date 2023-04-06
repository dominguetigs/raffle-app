import { useEffect, useState } from 'react';

import { GridItem, Text } from '@chakra-ui/react';

import {
  BASE_FONT_SIZE,
  FONT_SIZE_RATIO,
  RAFFLE_GRID_LENGTH,
  RAFFLE_ROW_COL_LENGTH,
} from '@r/constants';

interface RaffleCardItemProps {
  cardNumber: number;
  parentRef: any;
}

export const RaffleCardItem = ({ cardNumber, parentRef }: RaffleCardItemProps): JSX.Element => {
  const [cardDimension, setCardDimension] = useState(0);

  const [cardFontSize, setCardFontSize] = useState(0);

  const [boxWidth, setBoxWidth] = useState(0);

  function setCardNumber(n: number): string {
    const value = String(n + 1);
    return value.length === 1 ? value.padStart(2, '0') : value;
  }

  function calculateCardFontSize(dimension: number): void {
    const fontSize = Math.ceil(BASE_FONT_SIZE + dimension / FONT_SIZE_RATIO);
    setCardFontSize(fontSize);
  }

  function calculateCardDimension(): void {
    const width = boxWidth;
    const dimension = Math.floor(width / (RAFFLE_GRID_LENGTH / RAFFLE_ROW_COL_LENGTH));
    calculateCardFontSize(dimension);
    setCardDimension(dimension);
  }

  function updateBoxWidth(): void {
    const width = parentRef.current?.offsetWidth;
    setBoxWidth(width);
  }

  useEffect(() => {
    updateBoxWidth();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateBoxWidth);

    return () => window.removeEventListener('resize', updateBoxWidth);
  }, []);

  useEffect(() => {
    calculateCardDimension();
  }, [boxWidth]);

  return (
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
  );
};

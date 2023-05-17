import { useEffect, useRef, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import {
  BASE_FONT_SIZE,
  FONT_SIZE_RATIO,
  RAFFLE_GRID_LENGTH,
  RAFFLE_ROW_COL_LENGTH,
} from '@r/constants';

import { RaffleCardItem } from '../RaffleCardItem';

export const RaffleCard = (): JSX.Element => {
  const boxRef = useRef(null) as any;

  const cards = Array.from({ length: RAFFLE_GRID_LENGTH }, (_, index) => index);

  const [cardDimension, setCardDimension] = useState(0);

  const [cardFontSize, setCardFontSize] = useState(0);

  const [boxWidth, setBoxWidth] = useState(0);

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
    const width = boxRef.current?.offsetWidth;
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
    <Grid
      templateColumns={`repeat(${RAFFLE_ROW_COL_LENGTH}, 1fr)`}
      maxW={500}
      maxH={500}
      m="0 auto"
      ref={boxRef}
    >
      {cards.map((cardNumber: number) => (
        <RaffleCardItem
          key={cardNumber}
          cardNumber={cardNumber}
          cardDimension={cardDimension}
          cardFontSize={cardFontSize}
        />
      ))}
    </Grid>
  );
};

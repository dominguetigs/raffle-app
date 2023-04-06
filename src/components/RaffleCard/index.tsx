import { useRef } from 'react';

import { Grid } from '@chakra-ui/react';

import { RAFFLE_GRID_LENGTH, RAFFLE_ROW_COL_LENGTH } from '@r/constants';

import { RaffleCardItem } from '../RaffleCardItem';

export const RaffleCard = (): JSX.Element => {
  const boxRef = useRef(null) as any;

  const cards = Array.from({ length: RAFFLE_GRID_LENGTH }, (_, index) => index);

  return (
    <Grid
      templateColumns={`repeat(${RAFFLE_ROW_COL_LENGTH}, 1fr)`}
      maxW={600}
      maxH={600}
      m="0 auto"
      ref={boxRef}
    >
      {cards.map((cardNumber: number) => (
        <RaffleCardItem key={cardNumber} cardNumber={cardNumber} parentRef={boxRef} />
      ))}
    </Grid>
  );
};

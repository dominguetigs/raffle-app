import { useRef, useState } from 'react';

import { Box, Button } from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

import styles from './styles.module.css';
import { Utils } from '@r/utils';

export const Raffle = (): JSX.Element => {
  const { selectedNumbers } = useRaffleRegister();

  const [raffleResult, setRaffleResult] = useState<number>();

  const [isFinishedRaffle, setIsFinishedRaffle] = useState(false);

  const selectedNumbersToRaffle = Object.keys(selectedNumbers);

  const confettiRef = useRef(null);

  function handleRaffle(): void {
    if (!selectedNumbersToRaffle.length) {
      return;
    }

    setIsFinishedRaffle(false);

    const maxLoop = 200;
    const minValue = 0;
    const maxValue = selectedNumbersToRaffle.length - 1;
    const timeouts: NodeJS.Timeout[] = [];

    console.log(456, selectedNumbersToRaffle);

    for (let i = 1; i <= maxLoop; i++) {
      const timeout = setTimeout(() => {
        setRaffleResult(+selectedNumbersToRaffle[Utils.raffle(minValue, maxValue)]);
      }, 25 * i);
      timeouts.push(timeout);
    }

    const timeout = setTimeout(() => {
      setIsFinishedRaffle(true);
      Utils.initConffeti(confettiRef.current);
      /* initConffeti(resultConfettiElement);
      raffleResult.style.color = 'var(--white)';
      resultCloseBtn.style.visibility = 'visible';
      resultCloseBtn.style.opacity = 1; */
      timeouts.forEach((timer) => clearTimeout(timer));
      clearTimeout(timeout);
    }, 25 * maxLoop);
  }

  return (
    <>
      <Button m="2rem auto" display="block" colorScheme="brand" onClick={() => handleRaffle()}>
        Sortear
      </Button>

      <Box className={styles['raffle-container']}>
        <Box className={styles['raffle-result']} color={isFinishedRaffle ? 'white' : 'inherit'}>
          {raffleResult}
        </Box>
        <Box ref={confettiRef} />
        {/**
         * 
        <Box id="result-confetti" />
         */}
      </Box>
    </>
  );
};

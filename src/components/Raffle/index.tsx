import { useRef, useState } from 'react';

import { Box, Button } from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

import { Icon } from '@iconify/react';

import styles from './styles.module.css';
import { Utils } from '@r/utils';

export const Raffle = (): JSX.Element => {
  const { selectedNumbers } = useRaffleRegister();

  const [isRaffling, setIsRaffling] = useState(false);

  const [raffleResult, setRaffleResult] = useState<number>();

  const [isFinishedRaffle, setIsFinishedRaffle] = useState(false);

  const selectedNumbersToRaffle = Object.keys(selectedNumbers);

  const audioRef = useRef<any>(null);

  const confettiRef = useRef(null);

  function handleRaffle(): void {
    if (!selectedNumbersToRaffle.length) {
      return;
    }

    audioRef.current.currentTime = 1;
    audioRef.current.play();

    if (!audioRef.current.paused) {
      setIsRaffling(true);

      const maxLoop = 200;
      const minValue = 0;
      const maxValue = selectedNumbersToRaffle.length - 1;
      const timeouts: NodeJS.Timeout[] = [];

      for (let i = 1; i <= maxLoop; i++) {
        const timeout = setTimeout(() => {
          setRaffleResult(+selectedNumbersToRaffle[Utils.raffle(minValue, maxValue)]);
        }, 25 * i);
        timeouts.push(timeout);
      }

      const timeout = setTimeout(() => {
        setIsFinishedRaffle(true);
        Utils.initConffeti(confettiRef.current);

        timeouts.forEach((timer) => clearTimeout(timer));
        clearTimeout(timeout);
      }, 25 * maxLoop);
    }
  }

  function stopRaffle() {
    setIsFinishedRaffle(false);
    setIsRaffling(false);
  }

  return (
    <>
      <Button m="2rem auto" display="block" colorScheme="brand" onClick={() => handleRaffle()}>
        Sortear
      </Button>

      <Box
        className={styles['raffle-container']}
        visibility={isRaffling ? 'visible' : 'hidden'}
        opacity={isRaffling ? 1 : 0}
      >
        <Box className={styles['raffle-result']} color={isFinishedRaffle ? 'white' : 'inherit'}>
          <span className={styles['raffle-result-number']}>{raffleResult}</span>
          {isFinishedRaffle && (
            <span className={styles['raffle-result-name']}>
              ({selectedNumbers[String(raffleResult)]})
            </span>
          )}
        </Box>
        <Icon
          className={styles['close-result-btn']}
          icon="mdi:check-circle-outline"
          visibility={isFinishedRaffle ? 'visible' : 'hidden'}
          opacity={isFinishedRaffle ? 1 : 0}
          onClick={() => stopRaffle()}
        />
        <Box ref={confettiRef} />
        <audio ref={audioRef}>
          {/* <source src="./assets/audio/raffle.ogg" type="audio/ogg" /> */}
          <source src="/audio/raffle.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Box>
    </>
  );
};

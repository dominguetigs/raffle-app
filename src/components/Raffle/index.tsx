import { Box, Button } from '@chakra-ui/react';

import { useRaffleRegister } from '@r/hooks/useRaffleRegister';

export const Raffle = (): JSX.Element => {
  const { selectedNumbers } = useRaffleRegister();

  console.log(selectedNumbers);

  return (
    <Box>
      <Button m="2rem auto" display="block" colorScheme="brand">
        Sortear
      </Button>
    </Box>
  );
};

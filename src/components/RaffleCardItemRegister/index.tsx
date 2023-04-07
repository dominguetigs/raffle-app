import {
  Button,
  ButtonGroup,
  FocusLock,
  FormControl,
  FormLabel,
  Input,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  Stack,
} from '@chakra-ui/react';

export const RaffleCardItemRegister = (): JSX.Element => {
  return (
    <PopoverContent p={5}>
      <FocusLock persistentFocus={false}>
        <PopoverArrow />
        <PopoverCloseButton color="brand.500" />
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="user-name">Nome</FormLabel>
            <Input id="user-name" />
          </FormControl>
          <ButtonGroup display="flex" justifyContent="flex-end">
            <Button colorScheme="brand">Salvar</Button>
          </ButtonGroup>
        </Stack>
      </FocusLock>
    </PopoverContent>
  );
};

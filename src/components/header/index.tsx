import { Flex, Image, Text } from '@chakra-ui/react';

export const Header = (): JSX.Element => {
  return (
    <Flex align="center" justify="center" mb={6}>
      <Text as="h1" fontSize="3xl" lineHeight={1.2}>
        Chá Rifa do Bryan
      </Text>
    </Flex>
  );
};

import { Flex, Image, Text } from '@chakra-ui/react';

import styles from './styles.module.css';

export const Header = (): JSX.Element => {
  return (
    <Flex align="center" justify="center" mb={6} gap={6}>
      <Image className={styles.image} src="/image/lion.jpeg" alt="Lion" />
      <Text as="h1" className={styles.title} lineHeight={1.2}>
        Chá Rifa do Bryan
      </Text>
    </Flex>
  );
};

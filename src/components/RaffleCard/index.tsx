import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';

const BASE_FONT_SIZE = 8;

const FONT_SIZE_RATIO = 16;

interface RaffleCardProps {
  length?: number;
}

export const RaffleCard = ({ length = 10 }: RaffleCardProps): JSX.Element => {
  const boxRef = useRef(null) as any;

  const [cardDimension, setCardDimension] = useState(0);

  const [cardFontSize, setCardFontSize] = useState(0);

  const [boxWidth, setBoxWidth] = useState(0);

  const cards = Array.from({ length }, (_, index) => index);

  function setCardNumber(col: number, row: number): string {
    const value = String(col * length + row + 1);
    return col === 0 && row < 9 ? value.padStart(2, '0') : value;
  }

  function calculateCardFontSize(dimension: number): void {
    const fontSize = Math.ceil(BASE_FONT_SIZE + dimension / FONT_SIZE_RATIO);
    setCardFontSize(fontSize);
  }

  function calculateCardDimension(): void {
    const width = boxWidth;
    const dimension = Math.floor(width / length);
    calculateCardFontSize(dimension);
    setCardDimension(dimension);
  }

  function updateBoxWidth(): void {
    const width = boxRef.current?.offsetWidth;
    setBoxWidth(width);
  }

  useLayoutEffect(() => {
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
    <Flex direction="column" align="center" maxW={800} m="0 auto" ref={boxRef}>
      {cards.map((col: number) => (
        <Flex key={col} h={`${cardDimension}px`}>
          {cards.map((row: number) => (
            <Flex
              key={row}
              w={`${cardDimension}px`}
              bg="#7fa3d3"
              borderWidth="1px"
              borderColor="brand.300"
              align="center"
              justify="center"
            >
              <Text as="span" fontSize={`${cardFontSize}px`}>
                {setCardNumber(col, row)}
              </Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

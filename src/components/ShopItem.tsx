import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

// import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Button,
  VStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

type Props = {
  shopItem: IShopItem;
};

const ShopItem: React.FC<Props> = ({ shopItem }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const { addToCart } = useContext(CartContext) as CartContextType;
  const handleAddToCart = () => {
    const cartItem: ICartItem = {
      id: Math.random(),
      shopItem,
      quantity,
    };

    addToCart(cartItem);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack marginBottom="4">
        <Image
          width={300}
          height={150}
          src={`https://via.placeholder.com/300x150?text=${shopItem.title}+Image`}
        />

        <Heading as="h4" size="md" padding="2">
          {shopItem.title}
        </Heading>

        <Flex alignItems="center">
          <IconButton
            aria-label="Decrease count of item"
            icon={<MinusIcon />}
            colorScheme="red"
            onClick={handleDecrease}
          />

          <Box
            minWidth="4ch"
            as="button"
            disabled
            justifySelf="center"
            fontWeight="bold"
          >
            {quantity}
          </Box>

          <IconButton
            aria-label="Increase count of item"
            icon={<AddIcon />}
            colorScheme="green"
            onClick={handleIncrease}
          />
        </Flex>

        <Box>
          <Button colorScheme="blue" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ShopItem;

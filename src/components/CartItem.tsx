import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import { Box, Flex, Heading, Badge, Button, HStack } from "@chakra-ui/react";

type Props = {
  cartItem: ICartItem;
};

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext) as CartContextType;

  const handleCartItemRemove = () => {
    removeFromCart(cartItem);
  };

  return (
    <Box width="full" padding="4" borderWidth="1px" borderRadius="lg">
      <HStack justifyContent="space-between">
        <Heading as="h4" size="md">
          {cartItem.shopItem.title}
        </Heading>

        <Flex alignItems="center">
          <Box
            backgroundColor="green.200"
            borderRadius="lg"
            textColor="black"
            px="2"
            size="lg"
            marginRight="2rem"
          >
            {cartItem.quantity}
          </Box>

          <Button colorScheme="red" onClick={handleCartItemRemove}>
            Remove
          </Button>
        </Flex>
      </HStack>
    </Box>
  );
};

export default CartItem;

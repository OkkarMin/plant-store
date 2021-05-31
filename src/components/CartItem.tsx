import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react";

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
            backgroundColor="green.100"
            borderRadius="lg"
            textColor="black"
            p="2"
            marginRight="2rem"
          >
            x {cartItem.quantity}
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

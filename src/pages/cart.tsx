import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

import Link from "next/link";

import {
  Button,
  Container,
  Box,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";

import CartItem from "../components/CartItem";

function Cart() {
  const { cart } = useContext(CartContext) as CartContextType;

  return (
    <Container marginTop="6">
      <Flex justifyContent="space-between">
        <Heading as="h3">Cart Page</Heading>

        <Flex>
          <Link href="/shop">
            <Button colorScheme="green" marginRight="4">
              To Shop
            </Button>
          </Link>
          <Link href="/shop-admin">
            <Button colorScheme="yellow">To Shop Admin</Button>
          </Link>
        </Flex>
      </Flex>

      {cart.length == 0 ? (
        <VStack marginTop="6" align="center">
          <Box
            width="full"
            padding="4"
            borderWidth="1px"
            borderRadius="lg"
            align="center"
            backgroundColor="red.100"
          >
            Empty cart. Please go to shop and add some item
          </Box>
        </VStack>
      ) : (
        <VStack marginTop="6" spacing="4">
          {cart.map((cartItem: ICartItem, i: number) => (
            <CartItem key={i} cartItem={cartItem} />
          ))}
        </VStack>
      )}
    </Container>
  );
}

export default Cart;

import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

import {
  Button,
  Text,
  Container,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  FormControl,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import ShopItem from "../components/ShopItem";

function ShopAdmin() {
  const { shop } = useContext(ShopContext) as ShopContextType;
  const { cart } = useContext(CartContext) as CartContextType;

  return (
    <Container marginTop="6">
      <Flex justifyContent="space-between">
        <Heading as="h3">Shop Page</Heading>

        <Flex>
          <Link href="/shop-admin">
            <Button colorScheme="yellow" marginRight="4">
              To Shop Admin
            </Button>
          </Link>
          <Link href="/cart">
            <Button leftIcon={<ArrowRightIcon />} colorScheme="blue">
              {cart.reduce((accumulator: any, cartItem: any) => {
                return accumulator + cartItem.quantity;
              }, 0)}{" "}
              in Cart
            </Button>
          </Link>
        </Flex>
      </Flex>

      <SimpleGrid marginTop="6" minChildWidth="250px" spacing="4">
        {shop.map((shopItem: IShopItem, i: number) => (
          <ShopItem key={i} shopItem={shopItem} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default ShopAdmin;

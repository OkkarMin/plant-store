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
  useToast,
} from "@chakra-ui/react";
import CartItem from "../components/CartItem";
import { CartContextType } from "next-env";
import { CartItem as ICartItem } from "domain/models/entities/CartItem";
import {
  OrderAggregate,
  OrderState,
} from "domain/models/aggregates/OrderAggregate";
import { Customer } from "domain/models/entities/Customer";
import { Cart as CartEntity } from "domain/models/entities/Cart";

function Cart() {
  const { cart } = useContext(CartContext) as CartContextType;

  const craftTextForBot = (cart: any) => {
    let message = `š *New Order*\nā± ${new Date().toLocaleString()}\n\n`;
    cart.map((cartItem: ICartItem) => {
      message = message.concat(
        `š ${cartItem.quantity} x ${cartItem.shopItem.name}\n`
      );
    });
    return message;
  };

  const toast = useToast();
  const handleOrderSubmit = () => {
    const botMessage = {
      message: {
        chat: {
          id: 214260361, // okkar
          ids: [214260361, 267672976], // okkar, ys
        },
        text: craftTextForBot(cart),
      },
    };

    fetch("/api/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botMessage),
    });

    const cartToCheckout = CartEntity.create({
      // @ts-ignore
      cartItems: [...cart],
    }).getResult();

    const customer = Customer.create({
      firstName: "Yeow",
      lastName: "Ying Sheng",
      phoneNumber: 91234567,
      email: "yeow@gmail.com",
      address: "100 Hong Kang Kah Kee",
    }).getResult();

    const order = OrderAggregate.create({
      cart: cartToCheckout,
      isSelfCollect: true,
      customer,
    }).getResult();
    order.changeState(OrderState.PAYMENT_UNCONFIRMED);

    fetch("/api/order/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    toast({
      title: "Check out success! Thank you for shopping with us š !",
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

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
          {cart.map((cartItem: any, i: number) => (
            <CartItem key={i} cartItem={cartItem} />
          ))}

          <Button isDisabled>
            Total :{" "}
            {cart.reduce((total: number, cartItem: any) => {
              return total + cartItem.value;
            }, 0)}
          </Button>

          <Button colorScheme="orange" onClick={handleOrderSubmit}>
            Check Out
          </Button>
        </VStack>
      )}
    </Container>
  );
}

export default Cart;

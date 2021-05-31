import Link from "next/link";

import {
  Button,
  Text,
  Container,
  Heading,
  VStack,
  OrderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";

const Index = () => {
  return (
    <Container marginTop="6">
      <VStack align="flex-start">
        <Heading>Introduction Page</Heading>

        <Text>Made a quick example of how we can utilize shopping cart</Text>

        <Heading size="md">User flow</Heading>
        <Container>
          <OrderedList>
            <ListItem fontSize="md">
              User go to <Code>shop</Code> page
            </ListItem>
            <ListItem>User add items to cart</ListItem>
            <ListItem>User go to cart to checkout or remove item</ListItem>
          </OrderedList>
        </Container>

        <Heading size="md">Admin flow</Heading>
        <Container>
          <OrderedList>
            <ListItem>
              Admin go to <Code>shop-admin</Code> page
            </ListItem>
            <ListItem>Admin add or remove items to be sold in shop</ListItem>
            <ListItem>Items in shop are updated accordingly</ListItem>
          </OrderedList>
        </Container>

        <Link href="/shop">
          <Button colorScheme="green" width="full">
            To Shop
          </Button>
        </Link>
        <Link href="/shop-admin">
          <Button colorScheme="yellow" width="full">
            To Shop Admin
          </Button>
        </Link>
        <Link href="/cart">
          <Button colorScheme="blue" width="full">
            To Cart
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Index;

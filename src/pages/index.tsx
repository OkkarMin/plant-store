import Link from "next/link";
import { useSession } from "next-auth/client";

import {
  Box,
  Button,
  Text,
  Container,
  Heading,
  VStack,
  OrderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
import Wave from "../components/Wave";

const Index = () => {
  const [session] = useSession();
  return (
    <Box height="100vh">
      <Box
        position="relative"
        minHeight={["25vh", "240px"]}
        background="green.100"
      >
        <Wave />
        <Container>
          <Box position="absolute" marginTop="6">
            <Heading>Introduction Page {session?.user!.name}</Heading>
            <Text>
              Made a quick example of how we can utilize shopping cart
            </Text>
          </Box>
        </Container>
      </Box>

      <Container>
        <VStack align="flex-start">
          <Heading size="md">User flow</Heading>
          <Container>
            <OrderedList>
              <ListItem fontSize="md">
                User go to <Code>shop</Code> page
              </ListItem>
              <ListItem>User add items to cart</ListItem>
              <ListItem>User go to cart to checkout or remove item</ListItem>
              <ListItem>
                User can go back to <Code>shop</Code>page to continue adding
              </ListItem>
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
          <Link href="/admin">
            <Button colorScheme="cyan" width="full">
              To Admin
            </Button>
          </Link>
          {session && (
            <Link href="/api/auth/signout">
              <Button colorScheme="teal" width="full">
                SignOut
              </Button>
            </Link>
          )}
          {!session && (
            <Link href="/api/auth/signin">
              <Button colorScheme="red" width="full">
                SignIn
              </Button>
            </Link>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;

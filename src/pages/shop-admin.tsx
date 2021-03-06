import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Link from "next/link";
import { useSession } from "next-auth/client";

import {
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Flex,
  FormControl,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import ShopAdminItem from "../components/ShopAdminItem";

function ShopAdmin() {
  const [session] = useSession();
  const { shop, addToShop } = useContext(ShopContext) as ShopContextType;

  const [id, setID] = useState<number>(shop.length);
  const [title, setTitle] = useState<string>("");

  useEffect(() => setID(shop.length), [shop]);

  const handleIDChange = (event: any) => setID(event.target.value);
  const handleTitleChange = (event: any) => setTitle(event.target.value);

  const toast = useToast();
  const handleAddToShop = () => {
    const shopItem: IShopItem = {
      id,
      title,
    };
    addToShop(shopItem);

    setTitle("");

    toast({
      title: `${shopItem.title} added to shop`,
      status: "success",
      position: "top-left",
      duration: 1000,
      isClosable: true,
    });
  };

  return session ? (
    <Container marginTop="6">
      <Flex justifyContent="space-between">
        <Heading as="h3">Shop Admin Page</Heading>

        <Flex>
          <Link href="/shop">
            <Button colorScheme="green" marginRight="4">
              To Shop
            </Button>
          </Link>
          <Link href="/cart">
            <Button leftIcon={<ArrowRightIcon />} colorScheme="blue">
              Cart
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Heading as="h3">Welcome : {session.user!.name}</Heading>

      <VStack spacing="4">
        <FormControl id="id" isRequired>
          <FormLabel>Shop Item ID</FormLabel>
          <Input
            isDisabled
            value={id}
            onChange={handleIDChange}
            placeholder="id number"
          />
        </FormControl>

        <FormControl id="title" isRequired>
          <FormLabel>Shop Item Title</FormLabel>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="flower | coffee | door mat"
          />
        </FormControl>

        <Button colorScheme="yellow" onClick={handleAddToShop}>
          Add New Item To Shop
        </Button>
      </VStack>

      <VStack marginTop="6">
        {shop.map((shopItem: IShopItem, i) => (
          <ShopAdminItem key={i} shopItem={shopItem} />
        ))}
      </VStack>
    </Container>
  ) : (
    <Container marginTop="6">
      <Heading>Need To Sign In First</Heading>
    </Container>
  );
}

export default ShopAdmin;

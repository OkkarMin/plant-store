import { useContext } from "react";

import { ShopContext } from "../context/ShopContext";

import { Box, Flex, Heading, Button, HStack, useToast } from "@chakra-ui/react";

type Props = {
  shopItem: IShopItem;
};

const ShopAdminItem: React.FC<Props> = ({ shopItem }) => {
  const { removeFromShop } = useContext(ShopContext) as ShopContextType;

  const toast = useToast();
  const handleShopItemRemove = () => {
    removeFromShop(shopItem);

    toast({
      title: `${shopItem.title} removed from shop`,
      status: "warning",
      position: "top-left",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Box width="full" padding="4" borderWidth="1px" borderRadius="lg">
      <HStack justifyContent="space-between">
        <Heading as="h4" size="md">
          {shopItem.title}
        </Heading>

        <Flex alignItems="center">
          <Box
            borderRadius="lg"
            textColor="black"
            px="2"
            size="lg"
            marginRight="2rem"
          >
            ID : {shopItem.id}
          </Box>

          <Button colorScheme="red" onClick={handleShopItemRemove}>
            Remove
          </Button>
        </Flex>
      </HStack>
    </Box>
  );
};

export default ShopAdminItem;

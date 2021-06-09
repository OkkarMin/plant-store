import { FC, useState } from "react";
import { mutate } from "swr";
import {
  Button,
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaUserAlt,
  FaHashtag,
  FaShuttleVan,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";

import {
  OrderAggregate,
  OrderState,
} from "domain/models/aggregates/OrderAggregate";
import { CartItem } from "domain/models/entities/CartItem";
import { UniqueEntityID } from "types-ddd/dist/src";

const orderStateColors = {
  PAYMENT_UNCONFIRMED: "blue",
  PAYMENT_CONFIRMED: "orange",
  PACKED: "cyan",
  ON_DELIVERY: "yellow",
  DELIVERED: "green",
  CANCELLED: "red",
};

type Props = {
  order: OrderAggregate;
};

const OrderItem: FC<Props> = ({ order }) => {
  const [loading, setLoading] = useState(false);

  const handleOrderStateChange = async (
    orderID: UniqueEntityID,
    newOrderState: OrderState
  ) => {
    setLoading(true);
    fetch(
      // @ts-ignore
      `/api/order/changeOrderState?orderID=${orderID.value}&newOrderState=${newOrderState}`
    ).then(() => {
      mutate(`/api/order/${order.currentState}`);
      setLoading(false);
    });
  };

  return (
    <Flex
      direction="column"
      borderRadius="lg"
      borderWidth="1px"
      shadow="sm"
      backgroundColor="gray.50"
      margin="4"
    >
      <Box padding="4">
        <HStack>
          <VStack alignItems="flex-start" spacing="1">
            {order.cart.cartItems.map((cartItem: CartItem, i: number) => (
              <Text key={i}>
                ➤ {cartItem.shopItem.name} x {cartItem.quantity}
              </Text>
            ))}
          </VStack>
          <Spacer />
          <Box alignSelf="flex-end">
            <Heading fontSize="lg">S$ {order.orderTotalAmount}</Heading>
          </Box>
        </HStack>
      </Box>

      <Divider />

      <Box padding="4">
        <HStack>
          <Icon as={FaHashtag} />
          <Text>{order.customer.customerID}</Text>
        </HStack>
        <HStack>
          <Icon as={FaUserAlt} />
          <Text>
            {order.customer.firstName} {order.customer.lastName}
          </Text>
        </HStack>
        <HStack>
          <Icon as={FaPhoneAlt} />
          <Text>{order.customer.phoneNumber}</Text>
        </HStack>
        <HStack>
          <Icon as={FaLocationArrow} />
          <Text>{order.customer.email}</Text>
        </HStack>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          isLoading={loading}
        >
          Change Order State
        </MenuButton>
        <MenuList>
          {Object.keys(OrderState).map((orderState: string, i: number) => {
            return (
              <MenuItem
                key={i}
                backgroundColor={`${
                  orderStateColors[orderState as OrderState]
                }.300`}
                onClick={() =>
                  handleOrderStateChange(
                    order.orderID,
                    OrderState[orderState as OrderState]
                  )
                }
              >
                {orderState}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default OrderItem;

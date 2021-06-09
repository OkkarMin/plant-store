import React from "react";
import { mutate } from "swr";
import {
  Button,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import {
  OrderAggregate,
  OrderState,
} from "domain/models/aggregates/OrderAggregate";
import { CartItem } from "domain/models/entities/CartItem";
import { UniqueEntityID } from "types-ddd/dist/src";

type Props = {
  order: OrderAggregate;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  const handleOrderStateChange = async (
    orderID: UniqueEntityID,
    newOrderState: OrderState
  ) => {
    fetch(
      // @ts-ignore
      `/api/order/changeOrderState?orderID=${orderID.value}&newOrderState=${newOrderState}`
    ).then(() => mutate(`/api/order/${order.currentState}`));
  };

  return (
    <Box>
      <Menu colorScheme="messenger">
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Change Order State
        </MenuButton>
        <MenuList>
          <MenuItem
            key={1}
            onClick={() =>
              handleOrderStateChange(
                order.orderID,
                OrderState.PAYMENT_UNCONFIMRED
              )
            }
          >
            {OrderState.PAYMENT_UNCONFIMRED}
          </MenuItem>

          <MenuItem
            key={2}
            onClick={() =>
              handleOrderStateChange(
                order.orderID,
                OrderState.PAYMENT_CONFIRMED
              )
            }
          >
            {OrderState.PAYMENT_CONFIRMED}
          </MenuItem>

          <MenuItem
            key={3}
            onClick={() =>
              handleOrderStateChange(order.orderID, OrderState.PACKED)
            }
          >
            {OrderState.PACKED}
          </MenuItem>

          <MenuItem
            key={4}
            onClick={() =>
              handleOrderStateChange(order.orderID, OrderState.ON_DELIVERY)
            }
          >
            {OrderState.ON_DELIVERY}
          </MenuItem>

          <MenuItem
            key={5}
            onClick={() =>
              handleOrderStateChange(order.orderID, OrderState.DELIVERED)
            }
          >
            {OrderState.DELIVERED}
          </MenuItem>

          <MenuItem
            key={6}
            onClick={() =>
              handleOrderStateChange(order.orderID, OrderState.CANCELLED)
            }
          >
            {OrderState.CANCELLED}
          </MenuItem>
        </MenuList>
      </Menu>
      <Box backgroundColor="orange">
        <Text>OrderID: {order.orderID.value}</Text>
        <Text>OrderTotal: {order.orderTotalAmount}</Text>
        <Text>OrderState: {order.currentState}</Text>
      </Box>

      <Box backgroundColor="cyan">
        <Text>ShopItems: </Text>
        {order.cart.cartItems.map((cartItem: CartItem, i: number) => (
          <Text key={i}>
            {" "}
            {cartItem.shopItem.name} x {cartItem.quantity}{" "}
          </Text>
        ))}
      </Box>
      <Box backgroundColor="yellow">
        <Text>Order By:</Text>
        <Text>CustomerID: {order.customer.customerID}</Text>
        <Text>
          CustomerName: {order.customer.firstName} {order.customer.lastName}
        </Text>
        <Text>CustomerPhone: {order.customer.phoneNumber}</Text>
        <Text>CustomerEmail: {order.customer.email}</Text>
      </Box>
    </Box>
  );
};

export default OrderItem;

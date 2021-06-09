import { FC, useState } from "react";
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
    <Box>
      <Menu colorScheme="messenger">
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

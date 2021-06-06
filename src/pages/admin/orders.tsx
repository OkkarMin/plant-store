import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import {
  Container,
  Heading,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import {
  OrderAggregate,
  OrderState,
} from "domain/models/aggregates/OrderAggregate";
import OrderItem from "src/components/OrderItem";

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Index = () => {
  const [session] = useSession();
  const { data, error } = useSWR("/api/order", fetcher);
  const [filtered, setFiltered] = useState<OrderAggregate[]>([]);

  const filterOrders = (
    data: OrderAggregate[],
    desiredOrderState: OrderState
  ) => {
    const result = data.filter(
      (order: OrderAggregate) => order.currentState == desiredOrderState
    );
    return result;
  };

  const handleFilterButtonPress = (desiredOrderState: OrderState) => {
    let result = filterOrders(data, desiredOrderState);
    setFiltered(result);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (data) {
    return (
      <Container marginTop="6">
        {!session ? (
          <Heading>Only for authorized users</Heading>
        ) : (
          <>
            <HStack>
              <Heading>Orders Page</Heading>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Filter Orders
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleFilterButtonPress(OrderState.PAYMENT_UNCONFIMRED)
                    }
                  >
                    Payment Unconfirmed
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleFilterButtonPress(OrderState.PAYMENT_CONFIRMED)
                    }
                  >
                    Payment Confirmed
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleFilterButtonPress(OrderState.PACKED)}
                  >
                    Packed
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleFilterButtonPress(OrderState.ON_DELIVERY)
                    }
                  >
                    On-Delivery
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleFilterButtonPress(OrderState.DELIVERED)
                    }
                  >
                    Delivered
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleFilterButtonPress(OrderState.CANCELLED)
                    }
                  >
                    Cancelled
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <VStack spacing="6" marginTop="6">
              {filtered.map((order: OrderAggregate, i: number) => (
                <OrderItem key={i} order={order} />
              ))}
            </VStack>
          </>
        )}
      </Container>
    );
  }
};

export default Index;

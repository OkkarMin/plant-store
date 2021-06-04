import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";

import { Container, Heading, VStack } from "@chakra-ui/react";
import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import OrderItem from "src/components/OrderItem";

const Index = () => {
  const [session] = useSession();
  const [orders, setOrders] = useState<OrderAggregate[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await fetch("/api/order");
      // console.log(await response.json());

      setOrders(await response.json());
    };
    getAllOrders();
  }, []);

  return (
    <Container marginTop="6">
      {!session ? (
        <Heading>Only for authorized users</Heading>
      ) : (
        <VStack spacing="6">
          <Heading>Orders Page</Heading>
          {orders.map((order: OrderAggregate, i: number) => (
            <OrderItem key={i} order={order} />
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;

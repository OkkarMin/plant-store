import { useSession } from "next-auth/client";
import useSWR from "swr";

import { Container, Heading, VStack } from "@chakra-ui/react";

import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import OrderItem from "src/components/OrderItem";

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Index = () => {
  const [session] = useSession();
  const { data, error } = useSWR("/api/order", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  if (data)
    return (
      <Container marginTop="6">
        {!session ? (
          <Heading>Only for authorized users</Heading>
        ) : (
          <VStack spacing="6">
            <Heading>Orders Page</Heading>
            {data.map((order: OrderAggregate, i: number) => (
              <OrderItem key={i} order={order} />
            ))}
          </VStack>
        )}
      </Container>
    );
};

export default Index;

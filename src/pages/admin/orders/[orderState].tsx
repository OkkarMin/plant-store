import { useRef } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";

import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import Wave from "src/components/Wave";
import OrderItem from "src/components/OrderItem";

import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";

const orderStateColors = {
  PAYMENT_UNCONFIRMED: "blue",
  PAYMENT_CONFIRMED: "orange",
  PACKED: "cyan",
  ON_DELIVERY: "yellow",
  DELIVERED: "green",
  CANCELLED: "red",
};

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Orders = () => {
  const { orderState } = useRouter().query;
  const { data, error } = useSWR(`/api/order/${orderState}`, fetcher);
  const [session] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const filterBtnRef = useRef(null);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Flex
        direction="column"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

  if (data) {
    return !session ? (
      <Heading>Only for authorized users</Heading>
    ) : (
      <>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={filterBtnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Select order type</DrawerHeader>

            <DrawerBody>
              <VStack alignItems="flex-start">
                {Object.keys(orderStateColors).map(
                  (oState: string, i: number) => {
                    return (
                      <Link key={i} href={`/admin/orders/${oState}`} replace>
                        <Button
                          // @ts-ignore
                          colorScheme={orderStateColors[oState]}
                          onClick={onClose}
                        >
                          {oState}
                        </Button>
                      </Link>
                    );
                  }
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Start of orders page */}
        <Flex direction="column" height="100vh">
          <Box
            position="relative"
            minHeight="225px"
            // @ts-ignore
            background={`${orderStateColors[orderState]}.300`}
          >
            <Wave />
            <Container>
              <Box position="absolute" marginTop="6">
                <Heading fontSize="2xl">{orderState} orders</Heading>

                <Button marginTop="2" ref={filterBtnRef} onClick={onOpen}>
                  Filter Orders
                </Button>
              </Box>
            </Container>
          </Box>
          <Flex
            direction={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            {data.map((order: OrderAggregate, i: number) => (
              <OrderItem key={i} order={order} />
            ))}
          </Flex>
        </Flex>
      </>
    );
  }
};

export default Orders;

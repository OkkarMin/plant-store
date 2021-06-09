import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { Container, Heading } from "@chakra-ui/react";

const Index = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      session && router.push("/admin/orders/PAYMENT_UNCONFIRMED");
      !session && router.push("/api/auth/signin");
    }
  }, [loading]);

  return (
    <Container marginTop="6">
      {session ? (
        <Heading>Redirecting...</Heading>
      ) : (
        <Heading>Login first</Heading>
      )}
    </Container>
  );
};

export default Index;

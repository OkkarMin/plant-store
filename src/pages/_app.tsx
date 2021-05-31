import { AppProps } from "next/app";
import CartProvider from "../context/CartContext";
import ShopProvider from "../context/ShopContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
      <CartProvider>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </CartProvider>
    </ShopProvider>
  );
}

export default MyApp;

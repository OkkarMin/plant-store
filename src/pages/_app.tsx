import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import CartProvider from "../context/CartContext";
import ShopProvider from "../context/ShopContext";
import { ChakraProvider } from "@chakra-ui/react";

import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="#TheAroidHouse"
        description="We try to make gardening simple"
        canonical="https://plant-store-cart.netlify.app"
        openGraph={{
          url: "https://plant-store-cart.netlify.app",
          title: "#TheAroidHouse",
          description: "We try to make gardening simple",
          images: [
            {
              url: "https://instagram.fsin9-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/178134354_975363846536200_4809142804680540019_n.jpg?tp=1&_nc_ht=instagram.fsin9-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=wEL3yRQCbPwAX_-n02e&edm=AP_V10EBAAAA&ccb=7-4&oh=b22addda4f16a8ccfabef8a205c696ab&oe=60BB1332&_nc_sid=4f375e",
              width: 1080,
              height: 1080,
              alt: "#TheAroidHouse",
            },
          ],
          site_name: "#TheAroidHouse",
        }}
      />
      <Provider session={pageProps.session}>
        <ShopProvider>
          <CartProvider>
            <ChakraProvider resetCSS>
              <Component {...pageProps} />
            </ChakraProvider>
          </CartProvider>
        </ShopProvider>
      </Provider>
    </>
  );
}

export default MyApp;

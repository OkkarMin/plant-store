import * as React from "react";
import { ShopContextType } from "next-env";

export const ShopContext = React.createContext<ShopContextType | null>(null);

const ShopProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [shop, setShop] = React.useState<any[]>([
    {
      _id: {
        value: "a767af45-2ca1-464d-9312-456142ad043a",
      },
      props: {
        images: ["/image1.png", "/image2.png"],
        name: "Apple Watch",
        description: "Extremely Best Item",
        value: 600,
        slug: "apple-watch",
      },
      images: ["/image1.png", "/image2.png"],
      name: "Apple Watch",
      description: "Extremely Best Item",
      slug: "apple-watch",
      variants: null,
      value: 600,
    },
    {
      _id: {
        value: "4f314838-bd55-461d-8c91-fa0671e47c5e",
      },
      props: {
        id: 2,
        images: ["/image1.png", "/image2.png"],
        name: "Keyboard Mech",
        description: "Goes Kiak Kiak Kiak",
        value: 200,
        slug: "keyboard-mech",
      },
      images: ["/image1.png", "/image2.png"],
      name: "Keyboard Mech",
      description: "Goes Kiak Kiak Kiak",
      slug: "keyboard-mech",
      variants: null,
      value: 200,
    },
    {
      _id: {
        value: "1594e835-d33e-4a9e-959b-e1f6633695ad",
      },
      props: {
        id: 3,
        images: ["/image1.png", "/image2.png"],
        name: "Fried Beehonn",
        description: "With Chicken Wing",
        value: 3,
        slug: "bee-hoon",
      },
      images: ["/image1.png", "/image2.png"],
      name: "Fried Beehonn",
      description: "With Chicken Wing",
      slug: "bee-hoon",
      variants: null,
      value: 3,
    },
  ]);

  const addToShop = (itemToAdd: any) => {
    setShop([...shop, itemToAdd]);
  };

  const removeFromShop = (itemToRemove: any) => {
    const updatedShop = shop.filter(
      (shopItem: any) => shopItem._id !== itemToRemove._id
    );

    console.log(updatedShop);

    setShop(updatedShop);
  };

  return (
    <ShopContext.Provider value={{ shop, addToShop, removeFromShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;

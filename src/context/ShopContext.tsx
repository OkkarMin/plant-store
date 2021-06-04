import * as React from "react";
import { ShopContextType } from "next-env";

export const ShopContext = React.createContext<ShopContextType | null>(null);

const ShopProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [shop, setShop] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getAllShopItems = async () => {
      const result = await fetch("/api/shop");
      setShop(await result.json());
    };
    getAllShopItems();
  }, []);

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

import * as React from "react";

export const ShopContext = React.createContext<ShopContextType | null>(null);

const ShopProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [shop, setShop] = React.useState<IShopItem[]>([
    {
      id: 0,
      title: "Stick",
    },
    {
      id: 1,
      title: "Pot",
    },
    {
      id: 2,
      title: "Plant",
    },
    {
      id: 3,
      title: "Fertilizer",
    },
  ]);

  const addToShop = (itemToAdd: IShopItem) => {
    setShop([...shop, itemToAdd]);
  };

  const removeFromShop = (itemToRemove: IShopItem) => {
    const updatedShop = shop.filter(
      (shopItem: IShopItem) => shopItem.id !== itemToRemove.id
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

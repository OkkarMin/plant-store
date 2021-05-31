/// <reference types="next" />
/// <reference types="next/types/global" />


interface IShopItem {
  id: number;
  title: string;
};

type ShopContextType = {
  shop: IShopItem[];
  addToShop: (item: IShopItem) => void;
  removeFromShop: (item: IShopItem) => void;
}

interface ICartItem {
  id: number;
  shopItem: IShopItem;
  quantity: number;
};

type CartContextType = {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (item: ICartItem) => void;
};
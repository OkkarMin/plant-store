/// <reference types="next" />
/// <reference types="next/types/global" />

import { ShopItem } from "domain/models/entities/ShopItem";

interface IShopItem {
  id: number;
  title: string;
}

type ShopContextType = {
  shop: IShopItem[];
  addToShop: (item: IShopItem) => void;
  removeFromShop: (item: IShopItem) => void;
};

interface ICartItem {
  shopItem: ShopItem;
  quantity: number;
}

type CartContextType = {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (item: ICartItem) => void;
};

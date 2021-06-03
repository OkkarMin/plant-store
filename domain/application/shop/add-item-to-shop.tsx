import { ShopItem } from "domain/models/entities/ShopItem";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IAddItemToShop {
  shopRepo: IShopRepo;
  shopItem: ShopItem;
  shopName: string;
}

export const addItemToShop = async ({
  shopRepo,
  shopItem,
  shopName,
}: IAddItemToShop) => {
  const shop = await shopRepo.getOne(shopName);
  const updatedShop = shop.addShopItem(shopItem);
  return await shopRepo.update(updatedShop);
};

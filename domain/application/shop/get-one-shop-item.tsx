import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShopItem {
  shopRepo: IShopRepo;
  shopName: string;
  itemName: string;
}

export const getOneShopItem = async ({
  shopRepo,
  shopName,
  itemName,
}: IGetOneShopItem) => {
  const shop = await shopRepo.getOne(shopName);
  return shop.getShopItemByName(itemName);
};

import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IListShopItems {
  shopRepo: IShopRepo;
  shopName: string;
}

export const listShopItems = async ({ shopRepo, shopName }: IListShopItems) => {
  const shop = await shopRepo.getOne(shopName);
  return shop.shopItems;
};

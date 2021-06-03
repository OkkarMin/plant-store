import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShopItem {
  shopRepo: IShopRepo;
  slug: string;
}

export const getOneShopItem = async ({ shopRepo, slug }: IGetOneShopItem) => {
  const shop = await shopRepo.getOne("TheAroyHouse");
  const shopItems = shop.shopItems;
  return shopItems.find((item) => item.slug === slug);
};

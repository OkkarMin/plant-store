import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShopItem {
  shopRepo: IShopRepo;
  slug: string;
}

export const getOneShopItem = async ({ shopRepo, slug }: IGetOneShopItem) => {
  const shop = await shopRepo.getOne("TheAroyHouse");
  // @ts-ignore
  const shopItems = shop.props.shopItems;
  // @ts-ignore
  return shopItems.find((item) => item.props.slug === slug);
};

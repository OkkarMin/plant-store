import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShopItem {
  shopRepo: IShopRepo;
  shopName: string;
  slug: string;
}

export const getOneShopItem = async ({
  shopRepo,
  shopName,
  slug,
}: IGetOneShopItem) => {
  const shop = await shopRepo.getOne(shopName);

  // @ts-ignore
  const shopItems = shop.props.shopItems;

  // @ts-ignore
  return shopItems.find((item) => item.props.slug === slug);
};

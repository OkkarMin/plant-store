import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
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
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    // @ts-ignore
    name: shop.props.name,
    // @ts-ignore
    shopItems: shop.props.shopItems,
  }).getResult();

  return shop.getShopItemBySlug(slug);
};

import { IShopRepo } from "domain/models/infrastructure/IShopRepository";
import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";

interface IListShopItems {
  shopRepo: IShopRepo;
  shopName: string;
}

export const listShopItems = async ({ shopRepo, shopName }: IListShopItems) => {
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    // @ts-ignore
    name: shop.props.name,
    // @ts-ignore
    shopItems: shop.props.shopItems,
  }).getResult();

  return shop.shopItems;
};

import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShop {
  shopRepo: IShopRepo;
  shopName: string;
}

export const getOneShop = async ({ shopRepo, shopName }: IGetOneShop) => {
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    // @ts-ignore
    name: shop.props.name,
    // @ts-ignore
    name: shop.props.shopItems,
  }).getResult();

  return shop;
};

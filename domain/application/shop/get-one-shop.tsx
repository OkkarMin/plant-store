import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShop {
  shopRepo: IShopRepo;
  shopName: string;
}

export const getOneShop = async ({ shopRepo, shopName }: IGetOneShop) => {
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    name: shop.name,
    shopItems: shop.shopItems,
  }).getResult();

  return shop;
};

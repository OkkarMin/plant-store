import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IGetOneShop {
  shopRepo: IShopRepo;
  shopName: string;
}

export const getOneShop = async ({ shopRepo, shopName }: IGetOneShop) => {
  const shop = await shopRepo.getOne(shopName);
  return shop;
};

import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { ShopItem } from "domain/models/entities/ShopItem";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

interface IAddItemToShop {
  shopRepo: IShopRepo;
  shopItem: ShopItem;
  shopName: string;
}

export const addItemToShop = async ({
  shopRepo,
  shopItem,
  shopName,
}: IAddItemToShop) => {
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    // @ts-ignore
    name: shop.props.name,
    // @ts-ignore
    shopItems: shop.props.shopItems,
  }).getResult();

  // shop = ShopAggregate.create({
  //   name: shopName,
  //   shopItems: [shopItem],
  // }).getResult();

  const updatedShop = shop.addShopItem(shopItem);
  return await shopRepo.save(updatedShop);
};

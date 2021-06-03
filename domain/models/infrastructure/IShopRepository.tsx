import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";

export interface IShopRepo {
  // write
  save(shop: ShopAggregate): Promise<boolean>;
  update(shop: ShopAggregate): Promise<boolean>;
  delete(shop: ShopAggregate): Promise<boolean>;

  // read
  getAll(): Promise<ShopAggregate[]>;
  getOne(shopName: string): Promise<ShopAggregate>;
}

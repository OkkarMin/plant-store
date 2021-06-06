import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

export class MongoShopRepository implements IShopRepo {
  public readonly db: any;

  private constructor(db: any) {
    this.db = db;
  }

  async save(shop: ShopAggregate): Promise<boolean> {
    return this.db.collection("shop").insertOne(shop);
  }

  async update(shop: ShopAggregate): Promise<boolean> {
    await this.db.collection("shop").deleteOne({ name: shop.name });

    return await this.save(shop);
  }

  delete(shop: ShopAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<ShopAggregate[]> {
    return this.db.collection("shop").find({});
  }

  getOne(shopName: string): Promise<ShopAggregate> {
    return this.db
      .collection("shop")
      .findOne({ name: shopName }, { projection: { props: 0 } });
  }

  public static create(db: any): MongoShopRepository {
    return new MongoShopRepository(db);
  }
}

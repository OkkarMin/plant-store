import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { IShopRepo } from "domain/models/infrastructure/IShopRepository";

export class FirebaseShopRepository implements IShopRepo {
  public readonly db;

  private constructor(db: any) {
    this.db = db;
  }

  save(shop: ShopAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(shop: ShopAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(shop: ShopAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<ShopAggregate[]> {
    throw new Error("Method not implemented.");
  }
  getOne(shopName: string): Promise<ShopAggregate> {
    throw new Error("Method not implemented.");
    // let mockShopItem1 = ShopItem.create({
    //   id: 1,
    //   description: "Very Nice Plant",
    //   images: ["/image1.png", "/image2.png"],
    //   name: "Nice Plant",
    //   value: 100,
    //   variants: ["large", "small", "extra-large"],
    // });
    // let mockShopItem2 = ShopItem.create({
    //   id: 2,
    //   description: "Not So Nice Plant",
    //   images: ["/image1.png", "/image2.png"],
    //   name: "Not Nice Plant",
    //   value: 50,
    //   variants: ["1", "2", "3"],
    // });
    // const mockShop = ShopAggregate.create({
    //   name: "TheAroyHouse",
    //   shopItems: [mockShopItem1.getResult(), mockShopItem2.getResult()],
    // });
    // mockShop.getResult().shopItems;
    // // @ts-ignore
    // return mockShop.getResult();
  }

  public static create(db: any) {
    return new FirebaseShopRepository(db);
  }
}

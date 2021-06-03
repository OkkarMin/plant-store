import { AggregateRoot, Result, UniqueEntityID } from "types-ddd";
import { ShopItem } from "domain/models/entities/ShopItem";

export interface ShopAggregateProp {
  name: string;
  shopItems: ShopItem[];
}

export class ShopAggregate extends AggregateRoot<ShopAggregateProp> {
  private constructor(props: ShopAggregateProp, id?: UniqueEntityID) {
    super(props, id);
  }

  get shopName(): string {
    return this.props.name;
  }

  get shopItems(): ShopItem[] {
    return this.props.shopItems;
  }

  public getShopItemByID(idToGet: number): ShopItem {
    let result = this.props.shopItems.find((item) => item.id === idToGet);

    if (!result) throw new Error("ShopItem with given ID not found");

    return result;
  }

  public getShopItemBySlug(slug: string): ShopItem {
    let result = this.props.shopItems.find((item) => item.slug === slug);

    if (!result) throw new Error("ShopItem with given slug not found");

    return result;
  }

  public addShopItem(newShopItem: ShopItem): ShopAggregate {
    this.props.shopItems.push(newShopItem);

    return this;
  }

  public static create(
    props: ShopAggregateProp,
    id?: UniqueEntityID
  ): Result<ShopAggregate> {
    if (!props.name && !props.shopItems) {
      return Result.fail<ShopAggregate>(
        "Required details for shop are not provided"
      );
    }

    if (!(props.name.length >= 4)) {
      return Result.fail<ShopAggregate>(
        "Shop name must be more than 4 characters"
      );
    }

    if (props.shopItems.length == 0) {
      return Result.fail<ShopAggregate>(
        "Must have at least one shop item in shop"
      );
    }
    return Result.ok<ShopAggregate>(new ShopAggregate(props, id));
  }
}

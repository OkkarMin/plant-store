import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface ShopItemProps extends BaseDomainEntity {
  images: string[];
  name: string;
  description: string;
  slug: string;
  variants?: string[];
  value: number;
}

export class ShopItem extends Entity<ShopItemProps> {
  public images: string[];
  public name: string;
  public description: string;
  public slug: string;
  public variants?: string[];
  public value: number;

  private constructor(props: ShopItemProps, id?: UniqueEntityID) {
    super(props, id);
    this.name = props.name;
    this.images = props.images;
    this.description = props.description;
    this.slug = props.slug;
    this.value = props.value;
    this.variants = props.variants;
  }

  public static create(
    props: ShopItemProps,
    id?: UniqueEntityID
  ): Result<ShopItem> {
    if (!props.images && !props.name && !props.description && !props.value) {
      return Result.fail<ShopItem>(
        "Required details for shop item is not provided"
      );
    }

    return Result.ok<ShopItem>(new ShopItem(props, id));
  }
}

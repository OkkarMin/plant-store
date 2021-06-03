import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface ShopItemProps extends BaseDomainEntity {
  id: number;
  images: string[];
  name: string;
  description: string;
  slug: string;
  variants?: string[];
  value: number;
}

export class ShopItem extends Entity<ShopItemProps> {
  private constructor(props: ShopItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): number {
    return this.props.id;
  }

  get images(): string[] {
    return this.props.images;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get variants(): string[] | undefined {
    return this.props.variants;
  }

  get value(): number {
    return this.props.value;
  }

  public static create(
    props: ShopItemProps,
    id?: UniqueEntityID
  ): Result<ShopItem> {
    if (
      !props.id &&
      !props.images &&
      !props.name &&
      !props.description &&
      !props.value
    ) {
      return Result.fail<ShopItem>(
        "Required details for shop item is not provided"
      );
    }

    return Result.ok<ShopItem>(new ShopItem(props, id));
  }
}

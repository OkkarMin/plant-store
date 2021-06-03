import { Entity, BaseDomainEntity, Result } from "types-ddd";

interface ShopItemProps extends BaseDomainEntity {
  id: number;
  images: string[];
  name: string;
  description: string;
  variants?: string[];
  value: number;
}

export class ShopItem extends Entity<ShopItemProps> {
  private constructor(props: ShopItemProps) {
    super(props);
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

  get description(): string {
    return this.props.description;
  }

  get variants(): string[] | undefined {
    return this.props.variants;
  }

  get value(): number {
    return this.props.value;
  }

  public static create(props: ShopItemProps): Result<ShopItem> {
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

    return Result.ok<ShopItem>(new ShopItem(props));
  }
}

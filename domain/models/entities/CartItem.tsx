import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";
import { ShopItem } from "domain/models/entities/ShopItem";

interface CartItemProps extends BaseDomainEntity {
  shopItem: ShopItem;
  quantity: number;
  variant: string;
}

export class CartItem extends Entity<CartItemProps> {
  private constructor(props: CartItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get value(): number {
    return this.props.shopItem.value;
  }

  get shopItemID(): number {
    return this.props.shopItem.value;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get variant(): string {
    return this.props.variant;
  }

  public static create(
    props: CartItemProps,
    id?: UniqueEntityID
  ): Result<CartItem> {
    if (!props.shopItem && !props.quantity && !props.variant) {
      return Result.fail<CartItem>(
        "Required details for cart item is not provided"
      );
    }

    return Result.ok<CartItem>(new CartItem(props, id));
  }
}

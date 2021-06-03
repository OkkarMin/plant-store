import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";
import { ShopItem } from "domain/models/entities/ShopItem";

interface CartItemProps extends BaseDomainEntity {
  shopItem: ShopItem;
  quantity: number;
  variant?: string;
}

export class CartItem extends Entity<CartItemProps> {
  public shopItem: ShopItem;
  public quantity: number;
  public variant?: string;
  public value: number;

  private constructor(props: CartItemProps, id?: UniqueEntityID) {
    super(props, id);
    this.shopItem = props.shopItem;
    this.quantity = props.quantity;
    this.variant = props.variant;
    this.value = this.shopItem.value * this.quantity;
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

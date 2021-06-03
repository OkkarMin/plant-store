import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";
import { CartItem } from "domain/models/entities/CartItem";

interface CartProps extends BaseDomainEntity {
  cartItems: CartItem[];
  isSelfCollect: boolean;
}

export class Cart extends Entity<CartProps> {
  public cartItems: CartItem[];
  public isSelfCollect: boolean;

  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
    this.cartItems = props.cartItems;
    this.isSelfCollect = props.isSelfCollect;
  }

  public addCartItem(cartItem: CartItem): void {
    this.cartItems.push(cartItem);
  }

  public cartTotalAmount(): number {
    return this.cartItems.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.value,
      0
    );
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    if (!props.cartItems && !props.isSelfCollect) {
      return Result.fail<Cart>("Required details for cart is not provided");
    }

    return Result.ok<Cart>(new Cart(props, id));
  }
}

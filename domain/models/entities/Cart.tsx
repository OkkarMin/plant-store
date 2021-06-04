import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";
import { CartItem } from "domain/models/entities/CartItem";

interface CartProps extends BaseDomainEntity {
  cartItems: CartItem[];
  cartTotalAmount?: number;
}

export class Cart extends Entity<CartProps> {
  public cartItems: CartItem[];
  public cartTotalAmount?: number;

  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
    this.cartItems = props.cartItems;
    this.cartTotalAmount = this.calculateCartTotal();
  }

  public addCartItem(cartItem: CartItem): void {
    this.cartItems.push(cartItem);
  }

  private calculateCartTotal(): number {
    return this.cartItems.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.value,
      0
    );
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    if (!props.cartItems) {
      return Result.fail<Cart>("Required details for cart is not provided");
    }

    return Result.ok<Cart>(new Cart(props, id));
  }
}

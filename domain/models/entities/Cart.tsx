import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";
import { CartItem } from "domain/models/entities/CartItem";

interface CartProps extends BaseDomainEntity {
  cartItems: CartItem[];
  totalAmount: number;
  isSelfCollect: boolean;
}

export class Cart extends Entity<CartProps> {
  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get totalAmount(): number {
    let result = 0;
    this.props.cartItems.map(
      (cartItem: CartItem) => (result += cartItem.value)
    );

    return result;
  }

  get isSelfCollect(): boolean {
    return this.props.isSelfCollect;
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    if (!props.cartItems && !props.totalAmount && !props.isSelfCollect) {
      return Result.fail<Cart>("Required details for cart is not provided");
    }

    return Result.ok<Cart>(new Cart(props, id));
  }
}

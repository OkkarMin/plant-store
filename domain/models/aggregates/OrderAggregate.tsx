import { AggregateRoot, Result, UniqueEntityID } from "types-ddd";
import { Cart } from "domain/models/entities/Cart";
import { Customer } from "domain/models/entities/Customer";

type OrderStateType =
  | "payment-unconfirmed"
  | "payment-confirmed"
  | "packed"
  | "on-delivery"
  | "delivered";

type OrderHistory = {
  dateTime: Date;
  orderState: OrderStateType;
};

interface OrderAggregateProps {
  cart: Cart;
  customer: Customer;
  currentState: OrderStateType;
  orderHistory: OrderHistory[];
}

export class OrderAggregate extends AggregateRoot<OrderAggregateProps> {
  private constructor(props: OrderAggregateProps) {
    super(props);
  }

  get orderID(): UniqueEntityID {
    return this._id;
  }

  get cart(): Cart {
    return this.props.cart;
  }

  get totalAmount(): number {
    return this.props.cart.totalAmount;
  }

  get currentState(): OrderStateType {
    return this.props.currentState;
  }

  public changeState(newOrderState: OrderStateType): void {
    this.props.currentState = newOrderState;

    this.props.orderHistory.push({
      dateTime: new Date(),
      orderState: this.props.currentState,
    });
  }

  public static create(props: OrderAggregateProps): Result<OrderAggregate> {
    if (!props.cart && !props.customer && !props.currentState) {
      return Result.fail<OrderAggregate>(
        "Required details for OrderAggregate are not provided"
      );
    }

    return Result.ok<OrderAggregate>(new OrderAggregate(props));
  }
}

import { AggregateRoot, Result, UniqueEntityID } from "types-ddd";
import { Cart } from "domain/models/entities/Cart";
import { Customer } from "domain/models/entities/Customer";

export enum OrderState {
  PAYMENT_UNCONFIMRED,
  PAYMENT_CONFIRMED,
  PACKED,
  ON_DELIVERY,
  DELIVERED,
}

type OrderHistory = {
  dateTime: Date;
  orderState: OrderState;
};

interface OrderAggregateProps {
  cart: Cart;
  customer: Customer;
  currentState: OrderState;
  orderHistory: OrderHistory[];
}

export class OrderAggregate extends AggregateRoot<OrderAggregateProps> {
  public cart: Cart;
  public customer: Customer;
  public currentState: OrderState;
  public orderHistory: OrderHistory[];

  private constructor(props: OrderAggregateProps, id?: UniqueEntityID) {
    super(props, id);
    this.cart = props.cart;
    this.customer = props.customer;
    this.currentState = props.currentState;
    this.orderHistory = props.orderHistory;
  }

  get orderID(): UniqueEntityID {
    return this._id;
  }

  get totalAmount(): number {
    const cartTotalAmount = this.cart.cartTotalAmount();
    return this.cart.isSelfCollect ? cartTotalAmount : cartTotalAmount + 10;
  }

  public changeState(newOrderState: OrderState): void {
    this.currentState = newOrderState;

    this.orderHistory.push({
      dateTime: new Date(),
      orderState: this.currentState,
    });
  }

  public static create(
    props: OrderAggregateProps,
    id?: UniqueEntityID
  ): Result<OrderAggregate> {
    if (!props.cart && !props.customer && !props.currentState) {
      return Result.fail<OrderAggregate>(
        "Required details for OrderAggregate are not provided"
      );
    }

    return Result.ok<OrderAggregate>(new OrderAggregate(props, id));
  }
}

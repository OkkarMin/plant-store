import { AggregateRoot, Result, UniqueEntityID } from "types-ddd";
import { Cart } from "domain/models/entities/Cart";
import { Customer } from "domain/models/entities/Customer";

export enum OrderState {
  PAYMENT_UNCONFIMRED = "PAYMENT_UNCONFIRMED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PACKED = "PACKED",
  ON_DELIVERY = "ON_DELIVERY",
  DELIVERED = "DELIVERED",
}

type OrderHistory = {
  dateTime: Date;
  orderState: OrderState;
};

interface OrderAggregateProps {
  cart: Cart;
  customer: Customer;
}

export class OrderAggregate extends AggregateRoot<OrderAggregateProps> {
  public cart: Cart;
  public customer: Customer;
  public currentState?: OrderState;
  public orderHistory?: OrderHistory[] = [];

  private constructor(props: OrderAggregateProps, id?: UniqueEntityID) {
    super(props, id);
    this.cart = props.cart;
    this.customer = props.customer;
  }

  get orderID(): UniqueEntityID {
    return this._id;
  }

  get totalAmount(): number {
    const cartTotalAmount = this.cart.cartTotalAmount();
    return this.cart.isSelfCollect ? cartTotalAmount : cartTotalAmount + 10; // delivery fee
  }

  public changeState(newOrderState: OrderState): OrderAggregate {
    this.currentState = newOrderState;

    this.orderHistory!.push({
      dateTime: new Date(),
      orderState: newOrderState,
    });

    return this;
  }

  public static create(
    props: OrderAggregateProps,
    id?: UniqueEntityID
  ): Result<OrderAggregate> {
    if (!props.cart && !props.customer) {
      return Result.fail<OrderAggregate>(
        "Required details for OrderAggregate are not provided"
      );
    }

    return Result.ok<OrderAggregate>(new OrderAggregate(props, id));
  }
}

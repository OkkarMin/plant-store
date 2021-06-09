import { AggregateRoot, Result, UniqueEntityID } from "types-ddd";
import { Cart } from "domain/models/entities/Cart";
import { Customer } from "domain/models/entities/Customer";

export enum OrderState {
  PAYMENT_UNCONFIRMED = "PAYMENT_UNCONFIRMED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PACKED = "PACKED",
  ON_DELIVERY = "ON_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

type OrderHistory = {
  dateString: string;
  orderState: OrderState;
};

interface OrderAggregateProps {
  cart: Cart;
  customer: Customer;
  isSelfCollect: boolean;
  currentState?: OrderState;
  orderID?: UniqueEntityID;
  orderHistory?: OrderHistory[];
  orderTotalAmount?: number;
}

export class OrderAggregate extends AggregateRoot<OrderAggregateProps> {
  public cart: Cart;
  public customer: Customer;
  public currentState: OrderState;
  public isSelfCollect: boolean;
  public orderID: UniqueEntityID;
  public orderHistory: OrderHistory[] = [];
  public orderTotalAmount: number;

  private constructor(props: OrderAggregateProps, id?: UniqueEntityID) {
    super(props, id);
    this.cart = props.cart;
    this.customer = props.customer;
    this.isSelfCollect = props.isSelfCollect;
    this.currentState = props.currentState || OrderState.PAYMENT_UNCONFIRMED;
    this.orderHistory = props.orderHistory || [];
    this.orderTotalAmount = this.calculateOrderTotalAmount();
    this.orderID = id ? id : this._id;
  }

  public changeState(newOrderState: OrderState): OrderState {
    this.currentState = newOrderState;

    this.orderHistory.push({
      dateString: new Date().toISOString(),
      orderState: newOrderState,
    });

    return newOrderState;
  }

  private calculateOrderTotalAmount(): number {
    const result = this.isSelfCollect
      ? this.cart.cartTotalAmount
      : this.cart.cartTotalAmount! + 10;

    return result!;
  }

  public static create(
    props: OrderAggregateProps,
    id?: UniqueEntityID
  ): Result<OrderAggregate> {
    if (!id && !props.cart && !props.customer && !props.isSelfCollect) {
      return Result.fail<OrderAggregate>(
        "Required details for OrderAggregate are not provided"
      );
    }

    return Result.ok<OrderAggregate>(new OrderAggregate(props, id));
  }
}

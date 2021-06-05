import { UniqueEntityID } from "types-ddd/dist/src";
import { OrderAggregate } from "../aggregates/OrderAggregate";

export interface IOrderRepo {
  // write
  save(order: OrderAggregate): Promise<boolean>;
  update(order: OrderAggregate): Promise<boolean>;
  delete(order: OrderAggregate): Promise<boolean>;

  // read
  getAll(): Promise<OrderAggregate[]>;
  getOne(orderID: UniqueEntityID): Promise<OrderAggregate>;
}

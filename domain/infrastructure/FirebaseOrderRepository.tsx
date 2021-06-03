import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

export class FirebaseOrderRepository implements IOrderRepo {
  public readonly db;

  private constructor(db: any) {
    this.db = db;
  }
  save(order: OrderAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(order: OrderAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(order: OrderAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<OrderAggregate[]> {
    throw new Error("Method not implemented.");
  }
  getOne(orderID: number): Promise<OrderAggregate> {
    throw new Error("Method not implemented.");
  }

  public static create(db: any) {
    return new FirebaseOrderRepository(db);
  }
}

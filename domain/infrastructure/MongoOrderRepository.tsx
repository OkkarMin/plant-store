import {
  OrderAggregate,
  OrderState,
} from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";
import { UniqueEntityID } from "types-ddd/dist/src";

export class MongoOrderRepository implements IOrderRepo {
  public readonly db;

  private constructor(db: any) {
    this.db = db;
  }

  save(order: OrderAggregate): Promise<boolean> {
    return this.db.collection("order").insertOne(order);
  }

  async update(order: OrderAggregate): Promise<boolean> {
    await this.db.collection("order").deleteOne({ orderID: order.orderID });

    return this.save(order);
  }

  delete(order: OrderAggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<OrderAggregate[]> {
    const cursor = await this.db.collection("order").find();

    let result: OrderAggregate[] = [];
    await cursor.forEach((order: OrderAggregate) => result.push(order));

    return result;
  }

  async getOrdersByState(orderState: OrderState): Promise<OrderAggregate[]> {
    const cursor = await this.db
      .collection("order")
      .find({ currentState: orderState });

    let result: OrderAggregate[] = [];
    await cursor.forEach((order: OrderAggregate) => result.push(order));

    return result;
  }

  async getOne(orderID: UniqueEntityID): Promise<OrderAggregate> {
    return this.db
      .collection("order")
      .findOne(
        { "orderID.value": orderID },
        { projection: { _id: 0, props: 0 } }
      );
  }

  public static create(db: any) {
    return new MongoOrderRepository(db);
  }
}

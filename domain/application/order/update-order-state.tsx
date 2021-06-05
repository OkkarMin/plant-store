import {
  OrderState,
  OrderAggregate,
} from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";
import { UniqueEntityID } from "types-ddd";

interface IUpdateOrder {
  orderRepo: IOrderRepo;
  orderID: UniqueEntityID;
  newOrderState: OrderState;
}

export const updateOrderState = async ({
  orderRepo,
  orderID,
  newOrderState,
}: IUpdateOrder) => {
  // find existing order in repo
  const result = await orderRepo.getOne(orderID);

  // rehydrate it
  const existingOrder = OrderAggregate.create(
    // @ts-ignore
    result,
    result.orderID
  ).getResult();

  // update order
  const updatedOrder = existingOrder.changeState(newOrderState);

  // save back to repo
  return await orderRepo.update(updatedOrder);
};

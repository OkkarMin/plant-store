import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface IUpdateOrder {
  orderRepo: IOrderRepo;
  orderAggregate: OrderAggregate;
}

export const updateOrder = async ({
  orderRepo,
  orderAggregate,
}: IUpdateOrder) => {
  return orderRepo.update(orderAggregate);
};

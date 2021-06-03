import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface IDeleteOrder {
  orderRepo: IOrderRepo;
  orderAggregate: OrderAggregate;
}

export const deleteOrder = async ({
  orderRepo,
  orderAggregate,
}: IDeleteOrder) => {
  return orderRepo.delete(orderAggregate);
};

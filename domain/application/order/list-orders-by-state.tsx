import { OrderState } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface IListOrdersByState {
  orderRepo: IOrderRepo;
  orderState: OrderState;
}

export const listOrdersByState = async ({
  orderRepo,
  orderState,
}: IListOrdersByState) => {
  return orderRepo.getOrdersByState(orderState);
};

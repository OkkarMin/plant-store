import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface IListOrders {
  orderRepo: IOrderRepo;
}

export const listOrders = async ({ orderRepo }: IListOrders) => {
  return orderRepo.getAll();
};

import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface IGetOneOrder {
  orderRepo: IOrderRepo;
  orderID: number;
}

export const updateOrder = async ({ orderRepo, orderID }: IGetOneOrder) => {
  return orderRepo.getOne(orderID);
};

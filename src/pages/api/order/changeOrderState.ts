import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";

import { UniqueEntityID } from "types-ddd";
import { OrderState } from "domain/models/aggregates/OrderAggregate";
import { updateOrderState } from "domain/application/order/update-order-state";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  const { orderID, newOrderState } = request.query as unknown as {
    orderID: UniqueEntityID;
    newOrderState: OrderState;
  };

  const result = await updateOrderState({ orderRepo, orderID, newOrderState });

  return response.status(200).json(result);
};

import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { OrderState } from "domain/models/aggregates/OrderAggregate";
import { listOrdersByState } from "domain/application/order/list-orders-by-state";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  const { orderState: orderStateQuery } = request.query as {
    orderState: string;
  };
  const orderState = orderStateQuery.toUpperCase() as OrderState;

  const result = await listOrdersByState({
    orderRepo,
    orderState,
  });

  if (!result)
    return response.status(404).json(`${orderStateQuery} are not found`);

  return response.status(200).json(result);
};

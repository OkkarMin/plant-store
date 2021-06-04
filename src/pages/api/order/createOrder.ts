import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { newOrder } from "domain/application/order/new-order";
import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  let { body } = request;
  const orderAggregate = OrderAggregate.create(body, body._id).getResult();

  const result = newOrder({ orderRepo, orderAggregate });

  return response.status(200).json(result);
};

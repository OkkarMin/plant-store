import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { listOrders } from "domain/application/order/list-orders";

module.exports = async (_: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  const result = await listOrders({ orderRepo });

  if (!result)
    return response.status(200).json({ error: "unable to get orders" });

  return response.status(200).json(result);
};

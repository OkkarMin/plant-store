import type { NextApiRequest, NextApiResponse } from "next";

import { MongoShopRepository } from "domain/infrastructure/MongoShopRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { listShopItems } from "domain/application/shop/list-shop-items";



module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const shopRepo = MongoShopRepository.create(db);

  const result = await listShopItems({shopRepo, shopName:'TheAroyHouse'})
  
  response.status(200).json(result);
};

import type { NextApiRequest, NextApiResponse } from "next";

import { MongoShopRepository } from "domain/infrastructure/MongoShopRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { getOneShopItem } from "domain/application/shop/get-one-shop-item";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const shopRepo = MongoShopRepository.create(db);

  const { slug } = request.query;

  const result = await getOneShopItem({
    shopRepo,
    // @ts-ignore
    slug,
  });

  if (!result) {
    return response.status(404).json({ 'error': `${slug} not found` })
  }

  return response.status(200).json(result);
};

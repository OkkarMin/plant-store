import type { NextApiRequest, NextApiResponse } from "next";

import { MongoShopRepository } from "domain/infrastructure/MongoShopRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { ShopAggregate } from "domain/models/aggregates/ShopAggregate";
import { ShopItem } from "domain/models/entities/ShopItem";
import { addShop } from "domain/application/shop/add-shop";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const shopRepo = MongoShopRepository.create(db);

  const { body } = request;
  const { name, shopItems } = body;

  const shopItem = ShopItem.create({
    images: shopItems[0].images,
    name: shopItems[0].name,
    description: shopItems[0].description,
    value: shopItems[0].value,
    slug: shopItems[0].slug,
  }).getResult();

  const newShop = ShopAggregate.create({
    name,
    shopItems: [shopItem],
  }).getResult();


  const result = await addShop({shopRepo, shop: newShop})

  response.status(200).json(result);
};

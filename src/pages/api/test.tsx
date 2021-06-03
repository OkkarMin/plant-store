import type { NextApiRequest, NextApiResponse } from "next";
import { FirebaseShopRepository } from "domain/infrastructure/FirebaseShopRepository";
import { listShopItems } from "domain/application/shop/list-shop-items";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { shopName, itemName } = request.body;

  if (!shopName)
    return response.status(404).json({ error: "shopName is required" });
  if (!itemName)
    return response.status(404).json({ error: "itemName is required" });

  const query = {
    shopRepo: FirebaseShopRepository.create("db"),
    shopName,
    itemName,
  };

  const result = await listShopItems(query);

  response.status(200).json(result);
};

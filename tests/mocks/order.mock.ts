import { Order } from "../../src/types/Order";

const validOrderListFromDB: Order[] = [
  {
    "id": 1,
    "userId": 1,
    "productIds": [{ "id": 2 }, { "id": 1 }]
  },
  {
    "id": 2,
    "userId": 3,
    "productIds": [{ "id": 4 }, { "id": 3 }]
  },
  {
    "id": 3,
    "userId": 2,
    "productIds": [{ "id": 5 }]
  }
]

const validOrderListResponse: Order[] = [
  {
    "id": 1,
    "userId": 1,
    "productIds": [2, 1]
  },
  {
    "id": 2,
    "userId": 3,
    "productIds": [4, 3]
  },
  {
    "id": 3,
    "userId": 2,
    "productIds": [5]
  }
]

const validOrderToCreate = {
  "userId": 1,
  "productIds": [1, 2]
}

const invalidOrderToCreate = {
  "userId": 1,
  "productIds": [1000, 2]
}

const orderToCreateEmptyProductsId = {
  "userId": 1,
  "productIds": []
}

const orderToCreateWithoutUserId = {
  "productIds": [1, 2]
}

const newOrderFromDB = {
  "id": 4,
  "userId": 1,
  "productIds": [1, 2]
}

export default {
  validOrderListFromDB,
  validOrderListResponse,
  validOrderToCreate,
  orderToCreateEmptyProductsId,
  orderToCreateWithoutUserId,
  newOrderFromDB,
  invalidOrderToCreate,
}
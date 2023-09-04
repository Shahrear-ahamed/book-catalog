// Your service code here

import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createOrder = async (payload: Order) => {
  return await prisma.order.create({
    data: payload,
  });
};

const getOrders = async () => {
  return await prisma.order.findMany();
};

// bonus part
const getOrderById = async (orderId: string, userId: string) => {
  return await prisma.order.findFirst({
    where: {
      AND: [{ id: orderId }, { userId }],
    },
  });
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderById,
};

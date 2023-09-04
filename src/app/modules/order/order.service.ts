// Your service code here

import { Order } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

type IOrderPayload = Order & {
  orderedBooks: [
    {
      bookId: string;
      quantity: number;
    },
  ];
};

const createOrder = async (payload: IOrderPayload, userId: string) => {
  payload.userId = userId;

  const { orderedBooks, ...others } = payload;

  const newOrder = await prisma.$transaction(async (prismaTrans) => {
    const order = await prismaTrans.order.create({
      data: others,
    });

    if (!order) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course");
    }

    if (orderedBooks && orderedBooks.length > 0) {
      const orderBookItems = orderedBooks.map((item) => {
        return {
          bookId: item.bookId,
          quantity: item.quantity,
          orderId: order.id,
        };
      });

      for (let i = 0; i < orderBookItems.length; i++) {
        await prismaTrans.orderedBook.create({
          data: orderBookItems[i],
        });
      }
    }

    return order;
  });

  if (!newOrder)
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create your order");

  return await prisma.order.findFirst({
    where: {
      id: newOrder.id,
    },
    include: {
      orderedBooks: true,
    },
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

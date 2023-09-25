// Your service code here

import { Order } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ENUM_USER_ROLE } from "../../../enum/userRole";

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
      throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create orders");
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

const getOrders = async (user: JwtPayload) => {
  if (user?.role === ENUM_USER_ROLE.ADMIN) {
    return await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
  }

  return await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      orderedBooks: true,
    },
  });
};

// bonus part
const getOrderById = async (orderId: string, user: JwtPayload | null) => {
  const condition =
    user?.role === ENUM_USER_ROLE.ADMIN
      ? { id: orderId }
      : { id: orderId, userId: user?.id };

  return await prisma.order.findFirst({
    where: {
      AND: [condition],
    },
    include: {
      orderedBooks: true,
    },
  });
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderById,
};

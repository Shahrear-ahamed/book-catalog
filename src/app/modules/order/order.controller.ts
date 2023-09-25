import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
// Your controller code here

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.createOrder(req.body, user?.id);

  sendResponse(res, {
    message: "Order created successfully",
    data: result,
    success: true,
    statusCode: httpStatus.OK,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.getOrders(user as JwtPayload);

  sendResponse(res, {
    message: "Orders retrieved successfully",
    data: result,
    success: true,
    statusCode: httpStatus.OK,
  });
});

// bonus part
const getOrderById = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderService.getOrderById(req.params.orderId, user);

  sendResponse(res, {
    message: "Order fetched successfully",
    data: result,
    success: true,
    statusCode: httpStatus.OK,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
};

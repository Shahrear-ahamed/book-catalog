// Your service code here

import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { BcryptPassword } from "../../../utils/bcryptPass";
import { TokenServices } from "../../../utils/token";

const signUp = async (payload: User) => {
  payload.password = await BcryptPassword.hashedPassword(payload.password);

  return await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const signIn = async (payload: Partial<User>) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const compared = await BcryptPassword.comparePassword(
    payload.password as string,
    isExist.password
  );

  if (!compared) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "email or password is wrong");
  }

  const userTokenData = {
    id: isExist.id,
    role: isExist.role,
  };

  const token = await TokenServices.generateToken(userTokenData);

  return {
    token,
  };
};

export const AuthService = { signUp, signIn };

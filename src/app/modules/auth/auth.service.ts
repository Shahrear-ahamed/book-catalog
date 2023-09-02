// Your service code here

import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { BcryptPassword } from "../../../utils/bcryptPass";
import { TokenServices } from "../../../utils/token";

const signUp = async (payload: User) => {
  payload.password = await BcryptPassword.hashedPassword(payload.password);

  const result = await prisma.user.create({
    data: payload,
  });

  const userTokenData = {
    id: result.id,
    email: result.email,
    role: result.role,
  };

  const token = await TokenServices.generateToken(userTokenData);
  const refreshToken = await TokenServices.generateRefreshToken(userTokenData);

  return {
    token,
    refreshToken,
  };
};

const signIn = async (payload: Partial<User>) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isExist) {
    throw new Error("User not found");
  }

  const compared = await BcryptPassword.comparePassword(
    payload.password as string,
    isExist.password
  );

  if (!compared) {
    throw new Error("email or password is wrong");
  }

  const userTokenData = {
    id: isExist.id,
    email: isExist.email,
    role: isExist.role,
  };

  const token = await TokenServices.generateToken(userTokenData);

  return {
    token,
  };
};

export const AuthService = { signUp, signIn };

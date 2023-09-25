// Your service code here

import prisma from "../../../shared/prisma";
import { selectOptions } from "./user.constants";

const allUsers = async () => {
  return await prisma.user.findMany({
    select: selectOptions,
  });
};

const getSingleUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: selectOptions,
  });
};

const updateUser = async (id: string, data: any) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    select: selectOptions,
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
    select: selectOptions,
  });
};

export const UserService = {
  allUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

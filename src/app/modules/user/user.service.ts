// Your service code here

import prisma from "../../../shared/prisma";

const allUsers = async () => {
  return await prisma.user.findMany({
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

const getSingleUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
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

const updateUser = async (id: string, data: any) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const UserService = {
  allUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

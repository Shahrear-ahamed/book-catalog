// Your service code here

import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (payload: Category) => {
  return await prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const getSingleCategory = async (id: string) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};

const updateCategory = async (id: string, payload: Category) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};

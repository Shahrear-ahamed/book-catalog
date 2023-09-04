// Your service code here

import { Book, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../utils/paginationHelper";
import { AllBooksSearchableFields } from "./book.constants";
import { IBooksFilterRequest } from "./book.interfaces";

const createBook = async (payload: Book) => {
  return await prisma.book.create({
    data: payload,
  });
};

const getAllBooks = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, maxPrice, minPrice, categoryId } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: AllBooksSearchableFields.map((filter) => ({
        [filter]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (categoryId) {
    andCondition.push({
      categoryId,
    });
  }

  if (maxPrice) {
    andCondition.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  if (minPrice) {
    andCondition.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  const whereCondition: Prisma.BookWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // get data
  const result = await prisma.book.findMany({
    where: whereCondition,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  // total count
  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getBookByCategoryId = async (categoryId: string) => {
  return await prisma.book.findMany({
    where: {
      categoryId,
    },
  });
};

const getBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: {
      id,
    },
  });
};

const updateBookById = async (id: string, payload: Book) => {
  return await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteBookById = async (id: string) => {
  return await prisma.book.delete({
    where: {
      id,
    },
  });
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};

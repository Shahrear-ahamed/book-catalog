// Your service code here

import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createBook = async (payload: Book) => {
  return await prisma.book.create({
    data: payload,
  });
};

const getAllBooks = async () => {
  return await prisma.book.findMany();
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

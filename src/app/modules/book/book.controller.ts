import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BooksFilterableFields } from "./book.constants";
import { BookService } from "./book.service";
// Your controller code here

const createBook = catchAsync(async (req, res) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const filters = pick(req.query, BooksFilterableFields);
  const pagination = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await BookService.getAllBooks(filters, pagination);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books fetched successfully",
    data: result,
  });
});

const getBookByCategoryId = catchAsync(async (req, res) => {
  const id = req.params.categoryId;

  const result = await BookService.getBookByCategoryId(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books retrieved by category successfully",
    data: result,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.getBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book retrieved by id successfully",
    data: result,
  });
});

const updateBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.updateBookById(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.deleteBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};

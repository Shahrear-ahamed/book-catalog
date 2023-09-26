import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BooksFilterableFields } from './book.constants';
import { BookService } from './book.service';
// Your controller code here

const createBook = catchAsync(async (req, res) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const filters = pick(req.query, BooksFilterableFields);
  const pagination = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllBooks(filters, pagination);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookByCategoryId = catchAsync(async (req, res) => {
  const id = req.params.categoryId;
  const pagination = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getBookByCategoryId(id, pagination);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.getBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.updateBookById(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBookById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.deleteBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is deleted successfully',
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

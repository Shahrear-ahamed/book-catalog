// Define your validations here

import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    ),
  }),
});

export const OrderValidation = {
  createOrder,
};

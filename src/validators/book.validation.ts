import joi from "joi";

export const createBookValidation = joi.object({
  book_name: joi.string().required(),
  author_name: joi.string().required(),
  available_quantity: joi.number().required(),
});

export const updateBookValidation = joi.object({
  book_name: joi.string().optional(),
  author_name: joi.string().optional(),
  available_quantity: joi.number().optional(),
});

export const bookValidation = joi.object({
    book_id:joi.number().required(),
    user_id:joi.number().required()
})

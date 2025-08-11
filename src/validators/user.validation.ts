import joi from "joi";

export const crateUserValidation = joi.object({
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    email:joi.string().required(),
    address:joi.string().required(),
    contact_no:joi.string().required()
})

export const updateUserValidation = joi.object({
    first_name:joi.string().optional(),
    last_name:joi.string().optional(),
    email:joi.string().optional(),
    address:joi.string().optional(),
    contact_no:joi.string().optional()
})
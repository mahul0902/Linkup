import Joi from "joi";

export const postSchema = Joi.object({
    content: Joi.string().required(),
})

export const commentSchema = Joi.object({
    content: Joi.string().required()
})
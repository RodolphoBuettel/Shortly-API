import joi from "joi";

export const signInSchema = joi.object(
    {
        email: joi.string().required(),
        password: joi.string().required().max(50)
    }
);
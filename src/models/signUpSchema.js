import joi from "joi";

export const signUpSchema = joi.object(
    {
        name: joi.string().required().min(3).max(50),
        email: joi.string().required().min(6).max(50),
        password: joi.string().required().max(50),
        confirmPassword: joi.string().required().max(50)
    }
);
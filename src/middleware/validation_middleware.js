// import joi from "joi"
// import { Types } from "mongoose"

// const validationObjectId = (value, helper) => {
//     return Types.ObjectId.isValid(value) ? true
//      : helper.message("please inter valid _id")
// }

// export const generationFields = {
//     email: joi.string().email({
//         minDomainSegments: 2,
//         maxDomainSegments: 4,
//         tlds: { allow: ['com', 'net'] }
//     }).required(),
//     //=================
//     password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
//     cPassword: joi.string().required().valid(joi.ref("password")),
//     //=================
//     id: joi.string().custom(validationObjectId).required(),
//     file: joi.object({
//         size: joi.number().positive().required(),
//         path: joi.string().required(),
//         filename: joi.string().required(),
//         destination: joi.string().required(),
//         mimetype: joi.string().required(),
//         encoding: joi.string().required(),
//         originalname: joi.string().required(),
//         fieldname: joi.string().required()
//     })
// }






// export const validationMiddleware = (schema) => {
//     return (req, res, next) => {
//         const inputsData = {...req.body, ...req.params, ...req.query}    
//         if (req.file || req.files) {
//                inputsData.file = req.file ||  req.files
//           }
//         const validationResult = schema.validate(inputsData, { abortEarly: false })      
//         if (validationResult.error?.details) {
//             return res.status(400).json({ message: "validation error", validationError: validationResult.error?.details })
//         }
//         return next()
//     }
// } 

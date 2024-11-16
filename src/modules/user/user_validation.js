import Joi from 'joi';
import userModal from '../../../db/models/users_modal.js';



const isUnique = async (value, helpers) => {
    const exists = await userModal.exists({ name: value });
    if (exists) {
        return helpers.message('Name must be unique');
    }
    return value;
};
// =============================================================================================================

const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required',
    }),
    lastName: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required',
    }),
    gender: Joi.string().required().external(isUnique).messages({
        'any.required': 'gender is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$')).messages({
        'string.pattern.base': 'Password must contain at least two uppercase letters and one special character',
        'string.min': 'Password must be at least {#limit} characters long',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
        'any.required': 'Confirm password is required',
    }),
    mobile: Joi.string().pattern(new RegExp('^01[0-2][0-9]{8}$')).required().messages({
        'string.pattern.base': 'Please provide a valid Egyptian mobile number',
        'any.required': 'Mobile number is required',
    }),
    bDay: Joi.string()
        // .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/)
        .required()
        .messages({
            // 'string.pattern.base': 'Date of birth must be in the format like 15/08/1990',
            'string.empty': 'Date of birth is required'
        }),
    bMonth: Joi.string()
        // .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/)
        .required()
        .messages({
            // 'string.pattern.base': 'Date of birth must be in the format like 15/08/1990',
            'string.empty': 'Date of birth is required'
        }),
    bYear: Joi.string()
        // .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/)
        .required()
        .messages({
            // 'string.pattern.base': 'Date of birth must be in the format like 15/08/1990',
            'string.empty': 'Date of birth is required'
        }),
});
export const signupValidation = async (req, res, next) => {
    try {
        // Asynchronously validate the request body
        await signupSchema.validateAsync(req.body, { abortEarly: false });
        next(); // Proceed to the next middleware or route handler if validation passes
    } catch (error) {
        // Handle validation errors
        return res.status(400).json({
            success: false,
            status: 'Validation failed',
            message: error.details.map(err => err.message),

            // Extracting error messages
        });
    }
};

// =============================================================================================================

const senCodeSchema = Joi.object({
    email: Joi.string().email().required()
        // .pattern(new RegExp('^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$'))
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),


});

export const senCodeSchemaValidator = (req, res, next) => {

    const { error } = senCodeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            details: error.details.map(err => err.message), // Extracting error messages
        });
    }

    next();
}
// =============================================================================================================
const codeSchema = Joi.object({
    code: Joi.number().required().messages({
        'any.required': 'Code is required',
    }),

});

export const codeSchemaValidator = (req, res, next) => {

    const { error } = codeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            details: error.details.map(err => err.message), // Extracting error messages
        });
    }

    next();
}
// =============================================================================================================
const changePasswordSchema = Joi.object({
    newPassword: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$')).messages({
        'string.pattern.base': 'new Password must contain at least two uppercase letters and one special character',
        'string.min': 'new Password must be at least {#limit} characters long',
        'any.required': 'new Password is required',
    }),
    confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Confirm new password must match new password',
        'any.required': 'Confirm new password is required',
    }),

});

export const changePasswordSchemaValidator = (req, res, next) => {

    const { error } = changePasswordSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            details: error.details.map(err => err.message), // Extracting error messages
        });
    }

    next();
}


// =============================================================================================================

const settingsProfile = Joi.object({
    birthOfDate: Joi.string()
        .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/)
        .messages({
            'string.pattern.base': 'Date of birth must be in the format like 15/08/1990',
        }),
    name: Joi.string().min(3).max(50).external(isUnique).messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
    }),
    profileImage: Joi.object({
        mimetype: Joi.string()
            .valid('image/jpeg', 'image/png', 'image/gif') // Allow only specific image types
            .required(),
        size: Joi.number().max(5 * 1024 * 1024).required(), // Limit file size to 5MB
    }),
});
export const settingsProfileValidation = async (req, res, next) => {
    try {
        // Asynchronously validate the request body
        await settingsProfile.validateAsync(req.body, { abortEarly: false });
        next(); // Proceed to the next middleware or route handler if validation passes
    } catch (error) {
        // Handle validation errors
        return res.status(400).json({
            success: false,
            status: 'Validation failed',
            message: error.details.map(err => err.message),

            // Extracting error messages
        });
    }
};

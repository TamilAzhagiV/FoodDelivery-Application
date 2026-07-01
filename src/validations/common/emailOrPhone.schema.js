const { z } = require("zod");
const validator = require("validator");

const emailOrPhoneSchema = z
    .string({
        required_error: "Email or phone number is required"
    })
    .trim()
    .refine((value) => {

        const isEmail =
            validator.isEmail(value);

        const isPhone =
            /^[6-9]\d{9}$/.test(value);

        return isEmail || isPhone;

    }, {
        message:
        "Enter a valid email address or phone number"
    });

module.exports = emailOrPhoneSchema;
const { body, validationResult } = require("express-validator");
const { isUserNotExist, notHaveSpacesBetween } = require("./custom");

const usernameValidation = body("username")
	.trim()
	.notEmpty()
	.withMessage("username must not be empty")
	.matches(/^[a-zA-Z0-9]+$/)
	.withMessage("username must not contain special characters")
	.isLength({ min: 3, max: 15 })
	.withMessage("username must be between 3 and 15 characters long)")
	.isLowercase()
	.withMessage("username must be lowercase")
	.custom(async (value) => await isUserNotExist(value));

const passwordValidation = body("password")
	.trim()
	.custom(notHaveSpacesBetween)
	.isLength({ min: 8, max: 25 })
	.withMessage("password must be between 8 and 25 characters long");

const firstnameValidator = body("firstname")
	.trim()
	.matches(/^[a-zA-Z0-9]+$/)
	.withMessage("firstaname must not contain special characters")
	.notEmpty()
	.withMessage("firstname is required");

const lastnameValidator = body("lastname")
	.trim()
	.optional()
	.matches(/^[a-zA-Z0-9]+$/)
	.withMessage("lastname must not contain special characters");

module.exports = {
	validationResult,
	usernameValidation,
	passwordValidation,
	firstnameValidator,
	lastnameValidator,
};

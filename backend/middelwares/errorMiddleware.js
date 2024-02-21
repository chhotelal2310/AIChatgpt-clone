const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    // Create a copy of the error object to avoid mutation of the original error
    let error = { ...err };
    error.message = err.message;

    // Mongoose Cast Error
    if (error.name === 'CastError') {
        const message = 'Resource not found';
        error = new errorResponse(message, 404);
    }

    // Duplicate key error
    if (error.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new errorResponse(message, 400);
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        error = new errorResponse(message, 400);
    }

    // Send response for any error
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
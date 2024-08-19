const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const ErrorResponse = require('../utils/errorResponse');


// check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const token = req.params.id;
    if (!token) {
        return next(new ErrorResponse('isAuthenticatedReqToken: You must log in to access this ressource', 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('You must log in to access this ressource', 401));
    }
}


// admin middleware
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
}



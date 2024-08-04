const express = require('express');
const userRouter = require('./userRoute');
const balanceRouter = require('./balanceRoute');

const mainRouter = express.Router();

// Routes
mainRouter.use('/user', userRouter);
mainRouter.use('/balance', balanceRouter); // Added balanceRouter here

module.exports = mainRouter;

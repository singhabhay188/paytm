const express = require('express');
const authMiddle = require('../authMiddle')
const { Balance } = require('../db');
const mongoose = require('mongoose');

const balanceRouter = express.Router();

balanceRouter.get("/balance",authMiddle, async (req, res) => {
    const account = await Balance.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

balanceRouter.post("/transfer",authMiddle, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //we will use session to perform transaction
    const account = await Balance.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            status:false,
            message: "Insufficient balance"
        });
    }

    const toAccount = await Balance.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            status:false,
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Balance.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Balance.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        status:true,
        message: "Transfer successful"
    });
});

module.exports = balanceRouter;
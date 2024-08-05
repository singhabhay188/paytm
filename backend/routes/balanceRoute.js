const express = require('express');
const authMiddle = require('../authMiddle');
const { Balance } = require('../db');
const mongoose = require('mongoose');

const balanceRouter = express.Router();

balanceRouter.get("/get", authMiddle, async (req, res) => {
    try {
        console.log('hello is get balance ',req.userId);
        const account = await Balance.findOne({
            userId: req.userId
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account not found"
            });
        }

        console.log('Acouunt is found ',account);
        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
});

balanceRouter.post("/transfer", authMiddle, async (req, res) => {
    let { amount, to } = req.body;
    amount = Number(amount);

    if (isNaN(amount) || amount <= 0 || amount > 100000) {
        return res.status(400).json({ status: false, message: "Invalid amount" });
    }

    try {
        // Retrieve sender's account
        const account = await Balance.findOne({ userId: req.userId });

        if (!account || account.balance < amount) {
            return res.status(400).json({ status: false, message: "Insufficient balance" });
        }

        // Retrieve receiver's account
        const toAccount = await Balance.findOne({ userId: to });

        if (!toAccount) {
            return res.status(400).json({ status: false, message: "Invalid account" });
        }

        // Perform the transfer
        account.balance -= amount;
        toAccount.balance += amount;

        // Save changes
        await account.save();
        await toAccount.save();

        res.json({ status: true, message: "Transfer successful", balance:account.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
});

module.exports = balanceRouter;

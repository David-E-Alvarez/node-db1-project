const express = require('express');

const router = express.Router();

const db = require('./data/dbConfig.js');

//todo:post new account
router.post('/', (req,res) => {
    db('accounts').insert(req.body)
        .then(account => {
            console.log("account: ", account)
            res.status(201).json(account)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
})

//gets all accounts from "budget" database; "accounts" is table with id, name, and budget
router.get('/', (req,res) => {
    db('accounts')
        .then(accounts => {
            console.log(accounts)
            res.status(201).json(accounts)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;
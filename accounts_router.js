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
            res.status(500).json(error.message)
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

//update account
router.put('/:id', (req,res) => {
    db('accounts').where({id: req.params.id})
        .then(account => {
            console.log("account in put: ", account)
            if(account.length === 0 || account.length == null){
                res.status(404).json("account doesnt exist")
            }else{
                db('accounts').update(req.body).where({id: req.params.id})
                    .then(updatedAcct => {
                        console.log("updated account", updatedAcct)
                        res.status(201).json(updatedAcct)
                    })
                    .catch(error => {
                        res.status(500).json(error.message)
                    })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

//delete an account
router.delete('/:id', (req,res) => {
    db('accounts').where({id: req.params.id})
        .then(account => {
            console.log(account)
            if(account.length === 0 || account.length == null){
                res.status(404).json("account doesnt exist")
            }else{
                db('accounts').where({id: req.params.id}).del()
                    .then(delAcct => {
                        console.log("delAcct: ", delAcct)
                        res.status(201).json(delAcct)
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;
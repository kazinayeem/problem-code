const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoschema = require("../schemas/todoschemas")



const Todo = new mongoose.model("Todo", todoschema);

// get all todos
router.get('/', async (req, res) => {

    await Todo.find({}, (err, data) => {
        if (err) {
            res.status(500).json({

                error: "not show data please check your code",
            })
        } else {
            res.status(200).json({
                result: data,
                message: "todo get successfull"
            })
        }
    })

})

// get toso by filter 
router.get('/alltodos', (req, res) => {

    Todo.find({ status: "active" }).select({
        _id: 0,
        _v: 0,
        date: 0,
        title: 0,
    })
        .limit(2)
        .exec(
            (err, data) => {
                if (err) {
                    res.status(500).json({

                        error: "not show data please check your code",
                    })
                } else {
                    res.status(200).json({
                        result: data,
                        message: "todo get successfull"
                    })
                }
            }
        )

})

// get a todo
router.get('/:id', async (req, res) => {
    await Todo.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({

                error: "not show data please check your code",
            })
        } else {
            res.status(200).json({
                result: data,
                message: "todo get successfull"
            })
        }
    })


})

// post a todo
router.post('/', (req, res) => {
    const newtodo = new Todo(req.body);

    newtodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "there was an server singh error"
            })
        } else {
            res.status(200).json({
                error: "todo was insert successfull"
            })
        }
    });

});

// post multiple todos
router.post('/all', (req, res) => {

    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: "there was an server singh error"
            })
        } else {
            res.status(200).json({
                error: "todo were insert m successfull"
            })
        }
    })


})

// put todo
router.put('/', async (req, res) => {

})

// delete todo
router.delete('/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({

                error: "there was an server singh error",
            })
        } else {
            res.status(200).json({

                message: "todo delete successfull"
            })
        }
    })

})

module.exports = router;
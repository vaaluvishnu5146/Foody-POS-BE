const mongoose = require('mongoose');
const FoodModel = require('./Food.model');

const FoodRouter = require('express').Router();

/**
 * Create Food
 * Get all foods
 * Get food by id
 * update food by id
 * delete food by id
 */
FoodRouter.post('/create', async (req, res, next) => {
    try {
        const Food = new FoodModel(req.body);
        const response = await Food.save();

        if(response && response._id) {
           return res.status(201).json({
                success: true,
                message: "Food created successfully"
           })   
        } else {
            return res.status(500).json({
                success: false,
                message: "Food creation failed"
            })   
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            success: false,
            message: "Food creation failed"
        })
    }
})

FoodRouter.get('/all', async (req, res, next) => {
    const { page = 1, count = 5 } = req.query;
    try {
        const response = await FoodModel.find().limit(count).skip(Number(page) === 1 ? 0 : page * count)
        if (response && response.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Food fetched successfully",
                data: response
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "No Food Found",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })   
    }
})

FoodRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({
            success: true,
            error: 'Food id is not provided',
            message: "Something went wrong"
        });
    }
    try {
        const response = await FoodModel.findOne({ _id: id }); // null or {}
        if (response && response._id) {
            return res.status(200).json({
                success: true,
                message: "Food fetched successfully",
                data: response
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "No Food Found",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })   
    }
})

FoodRouter.patch('/update/:id', async (req, res, next) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: true,
            error: 'Food id is not provided',
            message: "Something went wrong"
        });
    }
    try {
        const response = await FoodModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, req.body, { new: true });
        if (response && response._id) {
            return res.status(201).json({
                success: true,
                message: "Food updated successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No Food item found",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })   
    }
})

FoodRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: true,
            error: 'Food id is not provided',
            message: "Something went wrong"
        });
    }
    try {
        const response = await FoodModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id)});
        if (response && response._id) {
            return res.status(201).json({
                success: true,
                message: "Food deleted successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No Food item deleted",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })   
    }
})


module.exports = FoodRouter;
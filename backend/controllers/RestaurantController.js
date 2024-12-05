const verifyToken = require('../middlewares/verifyToken')
const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const RestaurantController = require('express').Router()

//get all
RestaurantController.get('/getAll', async (req, res) => {
    try {
        const Restaurants = await Restaurant.find({})

        return res.status(200).json(Restaurants)
    } catch (error) {
        console.log(error);
        console.error(error)
    }
})

// fetch my Restaurant
RestaurantController.get('/find/my-Restaurant', verifyToken, async (req, res) => {
    try {
        const Restaurants = await Restaurant.find({ currentOwner: req.user.id })

        return res.status(200).json(Restaurants)
    } catch (error) {
        console.error(error)
    }
})

// fetch bookmarked Restaurant
RestaurantController.get('/find/bookmarked-Restaurants', verifyToken, async (req, res) => {
    try {
        const Restaurants = await Restaurant.find({ bookmarkedUsers: { $in: [req.user.id] } })

        return res.status(200).json(Restaurants)
    } catch (error) {
        console.error(error)
    }
})

// get one
RestaurantController.get('/find/:id', async (req, res) => {
    try {
        const Restaurant = await Restaurant.findById(req.params.id).populate('currentOwner', '-password')

        if (!Restaurant) {
            throw new Error('No such Restaurant with that id')
        } else {
            return res.status(200).json(Restaurant)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


// create Restaurant
RestaurantController.post('/', verifyToken, async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create({ ...req.body, currentOwner: req.user.id })

        return res.status(201).json(newRestaurant)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// update estate
RestaurantController.put('/:id', verifyToken, async (req, res) => {
    try {
        const Restaurant = await Restaurant.findById(req.params.id)
        if (Restaurant.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update Reastarunt")
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedRestaurant)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// bookmark/unbookmark estate
RestaurantController.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let Restaurant = await Restaurant.findById(req.params.id)
        if (Restaurant.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (Restaurant.bookmarkedUsers.includes(req.user.id)) {
            Restaurant.bookmarkedUsers = Restaurant.bookmarkedUsers.filter(id => id !== req.user.id)
            await Restaurant.save()
        } else {
            Restaurant.bookmarkedUsers.push(req.user.id)

            await Restaurant.save()
        }

        return res.status(200).json(Restaurant)
    } catch (error) {
        return res.status(500).json(error)
    }
})


// delete estate
RestaurantController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const Restaurant = await Restaurant.findById(req.params.id)
        if (Restaurant.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to delete other people properties")
        }

        await Restaurant.delete()

        return res.status(200).json({ msg: "Successfully deleted Reastaurant" })
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = RestaurantController
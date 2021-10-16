const Category = require("../models/category");

const categoryCtrl = {
    // create category
    create: async (req, res) => {
        const newCat = new Category(req.body);
        try {
            const savedCat = await newCat.save();
            res.status(200).json(savedCat);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get all category
    getAll: async (req, res) => {
        try {
            const cats = await Category.find();
            res.status(200).json(cats);
        } catch (err) {
            res.status(500).json(err);
        }

    }
}



module.exports = categoryCtrl;
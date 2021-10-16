const User = require("../models/user");
const bcrypt = require("bcrypt");

const userCtrl = {
    update: async (req, res) => {
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedUser);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your account!");
        }
    },
    delete: async (req, res) => {
        if (req.body.userId === req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                try {
                    await Post.deleteMany({ username: user.username })
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("user has been deleted")
                } catch (err) {
                    res.status(500).json(err);
                }

            } catch (err) {
                res.status(404).json("user not found")
            }
        } else {
            res.status(401).json("you can only delete you account")
        }
    },
    get: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...userRes } = user._doc;
            res.status(200).json(userRes);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getByUserName: async (req, res) => {
        const username = req.query.user;
        try {
            const user = await User.findOne({ username: username });
            const { password, ...userRes } = user._doc;
            res.status(200).json(userRes);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}



module.exports = userCtrl;
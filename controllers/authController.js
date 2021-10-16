const User = require("../models/user");
const bcrypt = require("bcrypt");

const auth = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                avatar: 'avatar.png'
            })
            const user = await newUser.save();
            const { password, ...userRes } = user._doc;
            res.status(200).json(userRes);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            !user && res.status(400).json("Wrong username");

            const validate = await bcrypt.compare(req.body.password, user.password);
            !validate && res.status(400).json("wrong password");

            const { password, ...userRes } = user._doc;
            res.status(200).json(userRes);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}



module.exports = auth;
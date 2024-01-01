// default import
const bcrypt = require('bcryptjs');

// custom import
const User = require('../model/userModel');
const { errorHandeler } = require('../utils/errorHandler')
const generateToken = require('../utils/generateToken.js');

module.exports = {
    // signup
    signupCall: async (name, email, phone, password, where, city, state) => {
        try {
            let user = await User.findOne({ email });

            if (user) {
                throw errorHandeler('User already exists', 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({
                name,
                email,
                phone,
                password: hashedPassword,
                where,
                city,
                state
            });

            const token = generateToken(user._id);

            return { token, user };

        } catch (error) {
            throw error;
        }
    },

    // login
    loginCall: async (email, password) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw errorHandeler('User not found', 404);
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw errorHandeler('Invalid credentials', 400);
            }

            const token = generateToken(user._id);

            return { token, user };

        } catch (error) {
            throw error;
        }
    }
}

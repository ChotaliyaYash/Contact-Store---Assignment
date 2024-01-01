// file imports
const { errorHandeler } = require("../utils/errorHandler");
const {
    signupCall,
    loginCall,
} = require("../helper/userHelper");

module.exports = {
    // signup
    // link       /api/auth/signup
    signup: async (req, res, next) => {
        try {
            const { name, email, phone, password, where, city, state } = req.body;

            if (!name || !email || !phone || !password || !where || !city || !state) {
                errorHandeler("Please fill all the required fields", 400);
            }

            const { token, user } = await signupCall(name, email, phone, password, where, city, state);

            return res
                .cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                })
                .status(200).json({
                    success: true,
                    message: "User Sign up successfully",
                    data: {
                        token,
                        user
                    }
                });

        } catch (error) {
            next(error);
        }
    },

    // login
    // link       /api/auth/login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                errorHandeler("Please fill all the fields", 400);
            }

            const { token, user } = await loginCall(email, password);

            return res
                .cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                })
                .status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    data: {
                        token,
                        user
                    }
                });

        } catch (error) {
            next(error);
        }
    },

    // logout
    // link       /api/auth/logout
    logout: async (req, res, next) => {
        try {
            return res
                .clearCookie("token")
                .status(200).json({
                    success: true,
                    message: "User logged out successfully",
                });

        } catch (error) {
            next(error);
        }
    },
}
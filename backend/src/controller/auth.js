const joi = require('joi');
const User = require('../models/auth');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { error, value } = registrationSchema.validate(req.body);
        if (error) {
            // Return detailed validation errors in the response
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        // Destructure properties from value
        const { username, email, password } = value;
        const isEmailExist = await User.findOne({
            email: email,
        });
        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "user already exists with this email"
            })
        };

        const hashedPassword = await User.hashPassword(password);
        const user = User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        const jwtsign = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY);

        req.session.jwt = jwtsign;

        res.json({ message: 'Registration successful', user });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            // Return detailed validation errors in the response
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        // Destructure properties from value
        const { email, password } = value;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password."
            })
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password."
            })
        }
        const jwtsign = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY);

        req.session.jwt = jwtsign;
        res.json({ message: 'Login successful', user });

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};








const currentUserInfo = async (req, res) => {
    try {
        if (!req.session?.jwt) {
            return res.status(404).json({
                currentUser: null
            })
        }
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        res.status(200).json({
            success: true,
            currentUser: payload,
        })
    } catch (error) {
        res.status(404).json({ currentUser: null })
    }
};






const registrationSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(9).required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(9).required(),
});

module.exports = { register, login, currentUserInfo };

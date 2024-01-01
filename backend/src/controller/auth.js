import joi from 'joi';


const register = async (req, res) => {
    try {
        const { error, value }  = registrationSchema.validate(req.body);
        if (error) {
            // Return detailed validation errors in the response
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        // Destructure properties from value
        const { username, email, password } = value;

        res.json({ message: 'Registration successful' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const login = async (req, res) => {
    try {
        const { error, value }  = loginSchema.validate(req.body);
        if (error) {
            // Return detailed validation errors in the response
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        // Destructure properties from value
        const { email, password } = value;

        res.json({ message: 'Registration successful' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};












export { register, login };













const registrationSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(9).required(),
});


const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(9).required(),
});

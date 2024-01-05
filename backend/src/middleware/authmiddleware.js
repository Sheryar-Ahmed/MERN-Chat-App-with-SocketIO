const jwt = require('jsonwebtoken');

const isAuthenticated = async (
    req,
    res,
    next
) => {
    try {
        console.log('JWT in session:', req.session?.jwt);

        
        if (!req.session?.jwt) {
            return res.status(409).json({
                success: false,
                message: 'Unauthorized Access'
            });
        }

        const decodedData = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY
        );

        req.currentUser = decodedData;
        next();
    } catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports =  { isAuthenticated };

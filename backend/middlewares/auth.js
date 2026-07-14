import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    try {

        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

export default  verifyToken
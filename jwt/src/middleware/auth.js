import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    // Expect format: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid or expired access token" });
        }
        req.user = user;
        next();
    });
}

export default jwtAuth;
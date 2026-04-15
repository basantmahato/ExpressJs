import fs from "fs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";

// Setup relative path explicitly using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/users.json");

const loginService = (username, password) => {
    const users = JSON.parse(fs.readFileSync(dbPath));
    const user = users.find((user) => user.username === username && user.password === password);
    
    if (!user) {
        return { message: "Unauthorized" };
    }
    
    // Generate a short-lived access token (e.g., 15 minutes)
    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    
    // Generate a long-lived refresh token (e.g., 7 days)
    const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    return { access_token, refresh_token };
}

const registerService = (username, password) => {
    const users = JSON.parse(fs.readFileSync(dbPath));
    const user = users.find((user) => user.username === username);
    
    if (user) {
        return { message: "User already exists" };
    }
    
    users.push({ id: users.length + 1, username, password });
    
    // Using stringify with (..., null, 2) to format the JSON file nicely
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
    
    return { message: "User registered successfully" };
}


const refreshTokenService = (token) => {
    if (!token) return { message: "Refresh token is required" };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const new_access_token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        
        return { access_token: new_access_token };
    } catch (error) {
        return { message: "Invalid or expired refresh token" };
    }
}

export default { loginService, registerService, refreshTokenService };


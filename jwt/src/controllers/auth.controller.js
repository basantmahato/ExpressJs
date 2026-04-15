import authService from "../service/auth.service.js";

const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginService(username, password);

    if (result.refresh_token) {
        // Set the refresh token as an HttpOnly, Secure cookie
        res.cookie("refreshToken", result.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Ensure refresh token does not leak via JSON payload
        delete result.refresh_token;
    }

    res.json(result);
};

const register = async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.registerService(username, password);
    res.json(result);
};

const refreshToken = (req, res) => {
    // Read the refresh token securely from the HttpOnly cookie
    const token = req.cookies.refreshToken;

    const result = authService.refreshTokenService(token);

    if (result.message) {
        return res.status(401).json(result);
    }
    res.json(result);
};

const logout = (req, res) => {
    const token = req.cookies.refreshToken;

    // Revoke the token server-side so it can never be reused
    authService.logoutService(token);

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.json({ message: "Successfully logged out" });
};

export default { login, register, refreshToken, logout };
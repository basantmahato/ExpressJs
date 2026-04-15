const API_URL = "http://localhost:3000/auth";
const testUser = "seeder_" + Math.floor(Math.random() * 10000);
const testPassword = "mySecurePassword";

const pass = (msg) => console.log(`  ✅ ${msg}`);
const fail = (msg) => console.log(`  ❌ ${msg}`);
const step = (n, msg) => console.log(`\n[${n}] ${msg}`);

async function runTest() {
    console.log("🚀 --- Full Refresh Token Flow Test ---");
    let accessToken = "";
    let cookieHeader = "";

    // ── Step 1: Register ──────────────────────────────────────────────────────
    step("1/6", `REGISTER new user: ${testUser}`);
    const regRes = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: testUser, password: testPassword }),
    });
    const regData = await regRes.json();
    regData.message === "User registered successfully" ? pass(regData.message) : fail(JSON.stringify(regData));

    // ── Step 2: Login ─────────────────────────────────────────────────────────
    step("2/6", "LOGIN and receive access token + refresh cookie");
    const loginRes = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: testUser, password: testPassword }),
    });
    const loginData = await loginRes.json();
    const rawCookies = loginRes.headers.getSetCookie();
    const refreshCookieStr = rawCookies.find((c) => c.startsWith("refreshToken="));

    if (loginData.access_token && refreshCookieStr) {
        accessToken = loginData.access_token;
        cookieHeader = refreshCookieStr.split(";")[0]; // "refreshToken=eyJ..."
        pass(`Access token received`);
        pass(`Refresh token cookie set`);
    } else {
        fail("Login failed: " + JSON.stringify(loginData));
        return;
    }

    // ── Step 3: Access protected route (/me) ───────────────────────────────
    step("3/6", "GET /auth/me with Bearer access token");
    const meRes = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const meData = await meRes.json();
    meRes.status === 200 ? pass(`Protected route OK — user id: ${meData.user?.id}`) : fail(JSON.stringify(meData));

    // ── Step 4: Refresh token ─────────────────────────────────────────────────
    step("4/6", "POST /auth/refresh-token via cookie");
    const refreshRes = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: { Cookie: cookieHeader },
    });
    const refreshData = await refreshRes.json();
    refreshData.access_token ? pass("New access token issued") : fail(JSON.stringify(refreshData));

    // ── Step 5: Logout ────────────────────────────────────────────────────────
    step("5/6", "POST /auth/logout — revoke refresh token server-side");
    const logoutRes = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { Cookie: cookieHeader },
    });
    const logoutData = await logoutRes.json();
    logoutData.message === "Successfully logged out" ? pass(logoutData.message) : fail(JSON.stringify(logoutData));

    // ── Step 6: Attempt refresh with revoked token ────────────────────────────
    step("6/6", "POST /auth/refresh-token AGAIN (should be rejected — token revoked)");
    const revokedRes = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: { Cookie: cookieHeader }, // same old cookie
    });
    const revokedData = await revokedRes.json();
    revokedRes.status === 401
        ? pass(`Correctly rejected: "${revokedData.message}"`)
        : fail(`Expected 401 but got ${revokedRes.status}: ${JSON.stringify(revokedData)}`);

    console.log("\n─────────────────────────────────────────");
    console.log("🏁 Test complete.");
}

runTest().catch((e) => console.error("\n💥 Unexpected error:", e.message));

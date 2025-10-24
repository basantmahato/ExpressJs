// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); 
const wallpaperRoutes = require('./routes/wallpaperRoutes');

const app = express();
const PORT = 3000;

// --- Application Setup ---

// 1. Ensure the 'uploads' directory exists synchronously (required by Multer)
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(UPLOAD_DIR);
}

// 2. Middleware
app.use(cors());

// 3. Serve static files (the uploaded wallpapers)
app.use('/uploads', express.static(UPLOAD_DIR));

// 4. Route Mounting
app.use('/', wallpaperRoutes); 

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
    console.log(`Access static uploads at http://localhost:${PORT}/uploads/`);
});

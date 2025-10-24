// utils/multerConfig.js
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        // file.fieldname + '-' + timestamp + .ext
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload Middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
}).single('wallpaper'); 

module.exports = { upload };

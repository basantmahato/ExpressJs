// routes/wallpaperRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { upload } = require('../utils/multerConfig');

const PORT = 3000; 
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const DATA_FILE = path.join(UPLOAD_DIR, 'wallpapers.json'); // New metadata file

// --- Helper Functions to manage JSON metadata ---
const loadMetadata = () => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
        return {};
    } catch (e) {
        console.error("Error loading metadata:", e);
        return {};
    }
};

const saveMetadata = (metadata) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(metadata, null, 2), 'utf8');
};

// Ensure DATA_FILE exists on first run
if (!fs.existsSync(DATA_FILE)) {
    saveMetadata({});
}

// --- 1. POST Endpoint (Upload a NEW wallpaper with metadata) ---
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        
        if (err) {
            return res.status(400).json({ msg: err.message || 'An upload error occurred.' });
        } 
        
        if (req.file === undefined) {
            return res.status(400).json({ msg: 'No file selected! Please choose a file.' });
        } 
        
        // Success: Store metadata
        const metadata = loadMetadata();
        const filename = req.file.filename;
        const title = req.body.title || 'Untitled';
        const description = req.body.description || 'No description provided';
        
        metadata[filename] = { title, description };
        saveMetadata(metadata);

        console.log(`File uploaded: ${filename}, Title: ${title}`);
        
        res.status(201).json({
            msg: 'File and metadata uploaded successfully',
            filename: filename,
            title: title,
            description: description,
            filepath: `/uploads/${filename}` 
        });
    });
});

// --- 2. PUT Endpoint (Update metadata for an EXISTING wallpaper) ---
router.put('/wallpapers/:filename', (req, res) => {
    const filename = req.params.filename;
    const { title, description } = req.body; // Data comes from JSON body

    if (!title || !description) {
        return res.status(400).json({ msg: 'Title and description are required for update.' });
    }

    const metadata = loadMetadata();
    if (!metadata[filename]) {
        return res.status(404).json({ msg: 'Wallpaper not found.' });
    }

    // Update the metadata fields
    metadata[filename].title = title;
    metadata[filename].description = description;

    saveMetadata(metadata);
    console.log(`Wallpaper metadata updated for: ${filename}`);
    
    res.json({ msg: 'Metadata updated successfully', filename, title, description });
});


// --- 3. GET Endpoint (Get the list of available wallpapers with metadata) ---
router.get('/wallpapers', (req, res) => {
    const metadata = loadMetadata();
    
    fs.readdir(UPLOAD_DIR, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            return res.status(500).json({ msg: 'Failed to retrieve wallpapers.' });
        }

        const wallpaperFiles = files
            .filter(file => {
                // Ensure it's a file and it exists in our metadata (optional check but good for cleanup)
                try {
                    return !fs.statSync(path.join(UPLOAD_DIR, file)).isDirectory() && metadata[file];
                } catch (e) {
                    return false; 
                }
            })
            .map(file => ({
                name: file,
                url: `http://localhost:${PORT}/uploads/${file}`,
                title: metadata[file].title,
                description: metadata[file].description
            }));

        res.json(wallpaperFiles);
    });
});

module.exports = router;

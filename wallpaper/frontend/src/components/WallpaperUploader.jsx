import React, { useState } from 'react';
import { uploadWallpaper } from '../api';
import './WallpaperUploader.css'; 

const WallpaperUploader = ({ onUploadSuccess }) => {
    // Keep file state as null initially
    const [file, setFile] = useState(null); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // CRITICAL CHECK: Ensure the file state holds a file object
        if (!file) {
            // This is the client-side check. If this fires, the state is empty.
            setMessage('Please select an image file before uploading.');
            return;
        }

        setLoading(true);
        setMessage('Uploading...');

        try {
            // 1. Create FormData and populate it with ALL required fields
            const formData = new FormData();
            formData.append('wallpaper', file); // File must be under the name 'wallpaper'
            formData.append('title', title);     
            formData.append('description', description); 

            // 2. Call the API function
            // (Assumes uploadWallpaper handles the POST request with fetch/axios)
            await uploadWallpaper(formData); 
            
            setMessage('Upload successful! 🎉');
            
            // Reset fields on success
            setFile(null);
            setTitle('');
            setDescription('');
            // Manually reset the file input element's value to clear the display
            document.getElementById('file-input').value = null;
            
            onUploadSuccess(); 

        } catch (error) {
            // Error handling, ensuring we display the error message from the server
            setMessage(`Upload failed: ${error.message || 'Server connection error.'}`);
        } finally {
            setLoading(false);
        }
    };
    
    // NOTE: The rest of the component structure remains the same as your prior versions.
    return (
        <div className="uploader-container">
            <h2>Upload New Wallpaper</h2>
            <form onSubmit={handleSubmit} className="uploader-form">
                
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    // Correctly sets the file object into state
                    onChange={(e) => setFile(e.target.files[0])} 
                    className="uploader-input"
                    required
                />
                
                <input
                    type="text"
                    placeholder="Image Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="uploader-input"
                    required
                />
                
                <textarea
                    placeholder="Short Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="uploader-textarea"
                />
                
                <button 
                    type="submit" 
                    disabled={loading || !file} 
                    className="uploader-button"
                >
                    {loading ? 'Uploading...' : 'Upload Wallpaper'}
                </button>
            </form>
            {/* The message will show the server's "No file selected!" error if it happens */}
            {message && <p className="uploader-message">{message}</p>}
        </div>
    );
};

export default WallpaperUploader;


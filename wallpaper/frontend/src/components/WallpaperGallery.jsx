import React, { useState, useEffect, useCallback } from 'react';
import { getWallpapers } from '../api';
import './WallpaperGallery.css'; 

const WallpaperGallery = ({ refreshTrigger }) => {
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWallpapers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          
            const data = await getWallpapers();
    
            setWallpapers(data);
        } catch (err) {
            setError('Could not connect to the server or fetch wallpapers. Please ensure the backend is running.');
            setWallpapers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWallpapers();
    }, [fetchWallpapers, refreshTrigger]);

    if (loading) return <p className="status-message">Loading wallpapers... ⏳</p>;
    if (error) return <p className="status-message error-message">{error}</p>;
    if (wallpapers.length === 0) return <p className="status-message">No wallpapers found. Upload one! ⬆️</p>;


    return (
        <div className="gallery-container">
            <h2>Wallpaper Collection</h2>
            
         
            <div className="wallpaper-grid">
                {wallpapers.map((wallpaper) => (
                    <div key={wallpaper.name} className="wallpaper-card">
                        <img 
                            src={wallpaper.url} 

                            alt={wallpaper.title || wallpaper.name} 
                            className="wallpaper-image" 
                            loading="lazy" 
                        />

                        <div className="wallpaper-details">
                            <h3 style={{fontSize :20 , marginLeft : 20 }} className="wallpaper-title">{wallpaper.title || 'Untitled'}</h3>
                            <p style={{marginLeft: 202}} className="wallpaper-description">{wallpaper.description || 'No description available.'}</p>
                        </div>
                        
                        <div className="wallpaper-info">
                        
                            <span className="wallpaper-filename-ref">File: {wallpaper.name}</span>
                            <a 
                                href={wallpaper.url} 
                                download={wallpaper.name} 
                                className="download-button"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default WallpaperGallery;

// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WallpaperGallery from './components/WallpaperGallery.jsx';
import WallpaperUploader from './components/WallpaperUploader.jsx';
import './App.css'; // Import the external CSS file



function App() {
    // State to trigger a refresh in the Gallery component when an upload is successful
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUploadSuccess = () => {
        // Increment key to trigger a re-fetch in WallpaperGallery
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <BrowserRouter>
        
            
                    <Routes>
                        <Route 
                            path="/" 

                            element={

                               <>

                         

                            <WallpaperGallery refreshTrigger={refreshKey} />
                         

                            </>
                          } 
                        />
                        <Route 
                            path="/upload" 

                            element={<WallpaperUploader onUploadSuccess={handleUploadSuccess} />} 
                        />
                    </Routes>
              
           
        </BrowserRouter>
    );
}

export default App;
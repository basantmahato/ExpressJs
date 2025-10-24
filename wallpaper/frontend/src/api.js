const API_URL = 'http://localhost:3000'; 


export const getWallpapers = async () => {
    try {
        const response = await fetch(`${API_URL}/wallpapers`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        throw error;
    }
};


export const uploadWallpaper = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData, 
        });

        const data = await response.json();

        if (!response.ok) {
           
            throw new Error(data.msg || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error uploading wallpaper:', error);
        throw error;
    }
};


export const updateWallpaper = async (filename, title, description) => {
    try {
        const response = await fetch(`${API_URL}/wallpapers/${filename}`, {
            method: 'PUT',
            headers: {

                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({ title, description }), 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error updating wallpaper metadata:', error);
        throw error;
    }
};

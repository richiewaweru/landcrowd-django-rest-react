import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteImageAndMapManagement = () => {
    const { landListingId } = useParams();
    const [images, setImages] = useState([]);
    const [maps, setMaps] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [selectedMapId, setSelectedMapId] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            const token = localStorage.getItem('token');
            try {
                const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/images/`, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                setImages(imagesResponse.data);

                const mapsResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/maps/`, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                setMaps(mapsResponse.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        fetchResources();
    }, [landListingId]);

    const handleImageSelect = (imageId) => setSelectedImageId(imageId);
    const handleMapSelect = (mapId) => setSelectedMapId(mapId);

    const handleImageDelete = async () => {
        if (!selectedImageId) {
            alert('Please select an image to delete.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/landlisting-images/update/${selectedImageId}/`, {
                headers: { 'Authorization': `Token ${token}` },
            });
            alert('Image deleted successfully');
            setImages(images.filter(image => image.id !== selectedImageId)); // Remove deleted image from state
            setSelectedImageId(null);
        } catch (error) {
            console.error('Error deleting image:', error.response || error);
            alert('Failed to delete image');
        }
    };

    const handleMapDelete = async () => {
        if (!selectedMapId) {
            alert('Please select a map to delete.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/landlisting-maps/update/${selectedMapId}/`, {
                headers: { 'Authorization': `Token ${token}` },
            });
            alert('Map deleted successfully');
            setMaps(maps.filter(map => map.id !== selectedMapId)); // removes deleted map from state
            setSelectedMapId(null); // resets selected map
        } catch (error) {
            console.error('Error deleting map:', error.response || error);
            alert('Failed to delete map');
        }
    };

    return (
        <div>
            <h2>Manage Images</h2>
            <div>
                {images.map((image) => (
                    <div key={image.id} onClick={() => handleImageSelect(image.id)}>
                        <img src={image.land_images} alt="Land" style={{ width: "100px", height: "100px", cursor: "pointer" }} />
                        {selectedImageId === image.id && <button onClick={handleImageDelete}>Delete Selected Image</button>}
                    </div>
                ))}
            </div>
            <h2>Manage Maps</h2>
            <div>
                {maps.map((map) => (
                    <div key={map.id} onClick={() => handleMapSelect(map.id)}>
                        <img src={map.land_map} alt="Map" style={{ width: "100px", height: "100px", cursor: "pointer" }} />
                        {selectedMapId === map.id && <button onClick={handleMapDelete}>Delete Selected Map</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteImageAndMapManagement;

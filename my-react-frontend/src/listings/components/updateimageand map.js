import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ImageAndMapManagement = () => {
    const { landListingId } = useParams(); 
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [maps, setMaps] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null); //stores images in an array
    const [selectedMapId, setSelectedMapId] = useState(null); // holds the selected map's ID for update

    useEffect(() => {
        const fetchResources = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetching images associated with the land listing
                const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/images/`, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                setImages(imagesResponse.data);

                // Fetching maps associated with the land listing
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

    console.log(images)

    // Handlers for file selection
    const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
    const handleImageSelect = (imageId) => setSelectedImageId(imageId);
    const handleMapSelect = (mapId) => setSelectedMapId(mapId);

  
    const handleImageUpdate = async () => {
        if (!selectedFile || !selectedImageId) {
            alert('Please select an image and a file to update.');
            return;
        }
    
        const formData = new FormData();
        formData.append('land_images', selectedFile);
    
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:8000/api/landlisting-images/update/${selectedImageId}/`,formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Image updated successfully');
            navigate('/lands');
        } catch (error) {
            console.error('Error updating image:', error.response || error);
            alert('Failed to update image');
        }
    };
    
    const handleMapUpdate = async () => {
        if (!selectedFile || !selectedMapId) {
            alert('Please select a map and a file to update.');
            return;
        }
    
        const formData = new FormData();
        formData.append('land_map', selectedFile); 
    
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:8000/api/landlisting-maps/update/${selectedMapId}/`,formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Map updated successfully');
            
            navigate('/lands'); 
        } catch (error) {
            console.error('Error updating map:', error.response || error);
            alert('Failed to update map');
        }
    };
    

    return (
        <div>
            <h2>Manage Images</h2>
            <div>
                {images.map((image) => (
                    <div key={image.id} onClick={() => handleImageSelect(image.id)}>
                        <img src={image.land_images} alt="Land" style={{ width: "100px", height: "100px", cursor: "pointer" }} />
                    </div>
                ))}
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button onClick={handleImageUpdate} disabled={!selectedImageId}>Update Selected Image</button>
            </div>
            <h2>Manage Maps</h2>
            <div>
                {maps.map((map) => (
                    <div key={map.id} onClick={() => handleMapSelect(map.id)}>
                        <img src={map.land_map} alt="Map" style={{ width: "100px", height: "100px", cursor: "pointer" }} />
                    </div>
                ))}
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button onClick={handleMapUpdate} disabled={!selectedMapId}>Update Selected Map</button>
            </div>
        </div>
    );
};

export default ImageAndMapManagement;

import React, { useState } from 'react';
import './PlayerImage.css'

export default function PlayerImage({ onImageUpdate }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result;
                setImage(imageData);
                onImageUpdate(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        if (!image) document.getElementById('fileInput').click();
    };

    return (
        // <div className="Image-container">PlayerImage</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="image"
                style={{
                    background: image ? `url(${image}) center/cover` : 'rgba(0,0,0,0.05)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
                    cursor: image ? 'default' : 'pointer',

                }}
                onClick={handleClick}>
                {!image && <span>Click to upload</span>}
            </div>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
        </div >
    )
}
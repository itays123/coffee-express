import React, { useState } from 'react';

const Rating = ({ initialRating, editable, onChange }) => {
    if (!initialRating) initialRating = 3.5;
    if (!onChange) onChange = () => {};
    const [rating, setRating] = useState(initialRating);
    let ratings = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
    for (let i = 0; i < rating; i++) {
        if (rating - i < 1) ratings[i] = 'star_half';
        else ratings[i] = 'star'
    }

    const handleStarClick = index => {
        if (!editable) return;
        onChange(index + 1);
        setRating(index + 1);
    }

    return ( 
        <div className="rating" style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center'
        }}>  
            { ratings.map((rating, index) => (
                <div 
                    className="icon"
                    onClick={() => handleStarClick(index)}
                    key={index}>
                    <i className="material-icons" style={{ color: '#fdcc0d', cursor: 'pointer' }} >
                        { rating }
                    </i>
                </div>
            )) }
        </div>
     );
}
 
export default Rating;
import React, { useState } from 'react';
import Rating from '../layout/Rating';
import '../../styles/forms/Feedback.css';
import { fetchContact } from '../../fetch';

const Feedback = () => {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(3);
    const [userFeedbackSent, userFeedbacked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        fetchContact(
            rating, 
            feedback.trim() !== '' ? feedback : 'Empty review', 
            name.trim() !== '' ? name : 'Anonymous'
        )
        setName('');
        setFeedback('');
        setRating(3);
        userFeedbacked(true);
    }

    return !userFeedbackSent ? ( 
        <form onSubmit={handleSubmit} className="feedback">
            <input type="text" onChange={e => setName(e.target.value)} placeholder="Review Name..." value={name} />
            <label>How would you describe our service?</label>
            <textarea onChange={e => setFeedback(e.target.value)} value={feedback} />
            <label>Please rate our service:</label>
            <Rating 
                editable 
                initialRating={rating} 
                onChange={r => setRating(r)} />
            <button className="btn">Send</button>
        </form>
     ): (
         <h1>thanks for your feedback:)</h1>
     );
}
 
export default Feedback;
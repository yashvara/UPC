import React, { useState } from 'react';
import './AddFeedback.css'; 

function AddFeedback() {
    const [feedbackData, setFeedbackData] = useState({
        email: '',
        message: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({
            ...feedbackData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/feedback/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });
            if (response.ok) {
                console.log('Feedback added successfully');
                setFeedbackData({
                    email: '',
                    message: '',
                    name: ''
                });
            } else {
                console.error('Failed to add feedback');
            }
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Add Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={feedbackData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={feedbackData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={feedbackData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default AddFeedback;

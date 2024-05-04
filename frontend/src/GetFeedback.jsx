import React, { useState, useEffect } from 'react';
import './AddFeedback.css'; 

function GetFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:8080/feedback/getAll');
                if (response.ok) {
                    const data = await response.json();
                    setFeedbackList(data);
                } else {
                    console.error('Failed to fetch feedback');
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="feedback-table-container">
            <h2>All Feedback</h2>
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map((feedback, index) => (
                        <tr key={index}>
                            <td>{feedback.id}</td>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetFeedback;

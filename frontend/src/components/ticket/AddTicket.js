import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';

export default function AddTicket() {
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const customerId = 1;

        // Create a new ticket object with form data
        const newTicket = {
            customerId: customerId,
            name: formData.name,
            subject: formData.subject,
            message: formData.message,
        };

        // Send the new ticket data to the backend
        fetch('http://localhost:8070/ticket/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTicket),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add a new ticket');
                }
                alert("Ticket Added Successfully");
                navigate("/dashboard")
                setFormData({
                    name: '',
                    subject: '',
                    message: '',
                });
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <div className='container-fluid pt-5 mb-5' style={{ background: '' }}>
                <div className='container p-5 mt-5 bg-body-secondary' style={{ borderRadius: 20 }}>
                    <h1 className='mt-3 text-center'>Add Ticket</h1>
                    <div className='container'>
                        <form onSubmit={handleSubmit} className='text-start'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            id='name'
                                            placeholder='Enter Name'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor='subject'>Subject</label>
                                        <input
                                            type='text'
                                            name='subject'
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            id='subject'
                                            placeholder='Enter Subject'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-12'>
                                    <div className='form-group'>
                                        <label htmlFor='message'>Message</label>
                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            id='message'
                                            placeholder='Enter message'
                                            required
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type='submit' className='btn col-3 mt-3 mb-5 btn-primary'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
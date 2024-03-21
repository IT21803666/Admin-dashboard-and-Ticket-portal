import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddManager() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        department: '',
        country: '', //add a managers country
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8070/manager/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Manager added successfully');
                navigate('/dashboard');
            } else {
                setStatus('Failed to add manager');
            }
        } catch (error) {
            setStatus('Failed to connect to the server');
        }
    };

    return (
        <div className='container-fluid  text-light m-5 mr-5' >
            <div className='container p-5'style={{ background: '	#11d1f4', borderRadius: 20 }}>
                <h1 className='mt-3'>Manager Registration</h1>
                <div className='container'>

                    <form onSubmit={handleSubmit} className='text-start'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group ">
                                    <label htmlFor="name" className='text-left'>Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter Email Address" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="contact">Contact Number</label>
                            <input type="number" className="form-control" id="contact" placeholder="Enter Contact Number" onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="department">Division</label>
                            <input type="text" className="form-control" id="department" placeholder="Enter Division" onChange={handleChange} />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" placeholder="Enter Country" onChange={handleChange} />
                        </div>
                        
                        
                        <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary">Submit</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>
        </div>
    );
}


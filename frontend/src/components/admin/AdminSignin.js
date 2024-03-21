import React, { useState } from 'react';                  //import useState from react package
import { useNavigate } from 'react-router-dom';           //import useNavigate function from react-router-dom package   

const AdminSignIn = () => {                                //functional component called AdminSignIn with variables of email, password, validationMessage 
    const [email, setEmail] = useState('');               //these variables hold data and update when their values change
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const navigate = useNavigate();                       //useNavigate to navigate into a different route

    const handleEmailChange = (e) => {                    //function to handle changes in email field   
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {                 //function to handle changes in the password field
        setPassword(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!email || !password) {                         //checks if email and password fields are null and if so sends a validation msg                
            setValidationMessage('Please enter email and password');  
            return;
        }

        try {                                               //try-catch block for errors and exceptions for the sign in  
            const response = await fetch('http://localhost:8070/admin/login', {  
                method: 'POST',                             //a POST request is sent to the above localhost with provided email and password
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to sign in');
            }

            const data = await response.json();

            // Set user ID as a cookie or in local storage (you may use a library for this)
            document.cookie = `userId=${data.userId}; path=/`;

            // Navigate to the dashboard
            navigate('/dashboard');

        } catch (error) {
            console.error('Error signing in:', error);
            setValidationMessage('Email or Password is Incorrect'); //if any error occurs sends a validation msg
        }
    };

    return (
        <div>
            <div className='container-fluid'>
                <div className='col-12 d-flex justify-content-center'>
                    <div className='col-3 py-5'>
                        <div className="content">
                            <div className="signUp-container py-5">
                                <h1 className="heading-signUp">Admin Login</h1>
                                <div className="outer-margin">
                                    <div className="signup-form" style={{ backgroundColor: "#C0C0C0", padding: 50, borderRadius: 20 }}>
                                        <form className='text-start'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                    value={email}
                                                    onChange={handleEmailChange} placeholder="Enter email" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" value={password}
                                                    onChange={handlePasswordChange} id="exampleInputPassword1" placeholder="Enter Password" />
                                            </div>
                                            <button type="submit" onClick={handleSignIn} className="btn mt-2 btn-primary">Sign In</button> 
                                            {/* Display validation message */}
                                            {validationMessage && (
                                                <p className="text-danger mt-2">{validationMessage}</p> 
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignIn;

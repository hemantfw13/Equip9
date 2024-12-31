import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:1010/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Registration successful!');
            navigate('/login'); 
        } else {
            alert('Registration failed!');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                backgroundColor: '#f9f9f9',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Register</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <input
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Mobile"
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            flex: '1',
                            marginRight: '10px',
                        }}
                    >
                        Register
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;

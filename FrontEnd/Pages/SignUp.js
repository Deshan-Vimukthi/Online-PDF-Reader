import React, { useState} from 'react';
import api from '../api';
import {Link} from "react-router-dom";

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            alert('username: ' + userName + ' pwd :' + password);
            const response = await api.post('/users/signup', {
                    username:userName,
                    password:password
                }
            );

            const data = response.data;
            if (response.status === 200 || response.status === 201) {
                alert('Sign up Successfully' + data);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={'login_container'}>
            <div className={'form'}>
                <h2 className={'login-title'}>Join With Us</h2>
                <form onSubmit={handleSubmit} className={'form'}>
                    <input
                        type="email"
                        value={userName}
                        className={'input'}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Email"
                        required

                    />
                    <input
                        type="password"
                        value={password}
                        className={'input'}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" className={'button'}>Register</button>
                </form>
                <Link to={'/login'}><h3>Login</h3></Link>
            </div>

        </div>
    );
}

export default SignIn;
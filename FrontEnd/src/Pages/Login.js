import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import '../App.css';
import {Link} from "react-router-dom";
const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', {
                    username:username,
                    password:password
                }
            );
            const { token } = response.data;
            login(token);
            process.env.USER=(token)?username:'NO_USER';
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={'login_container'}>
            <div className={'form'}>
                <h2 className={'login-title'}>Welcome Back</h2>
                <form onSubmit={handleSubmit} className={'form'}>
                    <input
                        type="email"
                        value={username}
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
                    <button type="submit" className={'button'}>Login</button>
                </form>
                <Link to={'/signup'}><h3>Register</h3></Link>
            </div>

        </div>
    );
};

export default Login;

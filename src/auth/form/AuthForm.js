import React from 'react';
import './AuthForm.css';

const AuthForm = ({ onEmailChange, onPasswordChange }) => (
    <div className="auth-form card">
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" onChange={e => onEmailChange(e.target.value)} required />
        <label htmlFor="password">Your Password</label>
        <input type="password" onChange={e => onPasswordChange(e.target.value)} required />
    </div>
)
 
export default AuthForm;
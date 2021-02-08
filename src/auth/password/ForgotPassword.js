import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChangePassword } from '../../fetch';

const ForgotPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (password.trim() !== '') {
            fetchChangePassword(token, password).then(res => res.json())
            .then(res => {
                console.log(res);
                console.log(res.data.changePassword);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return ( 
        <div className="forgot-password">
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h1 style={{ textAlign: "center" }}>change password</h1>
                <input type="password" placeholder="your new password..." 
                    onChange={e => setPassword(e.target.value)} style={{ margin: "4px auto" }} />
                <button className="btn">Apply</button>
            </form>
        </div>
     );
}
 
export default ForgotPassword;
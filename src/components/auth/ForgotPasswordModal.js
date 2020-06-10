import React, { useState, useContext } from 'react';
import Modal from '../shared/Modal';
import { AuthContext } from './AuthContext';

const ForgotPasswordModal = ({ showModal, setModalShown }) => {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useContext(AuthContext);
    
    const handleDismiss = confirmed => {
        setModalShown(false);
        if (email.trim() !== '' && confirmed) {
            forgotPassword(email);
        }
    }

    return showModal ? ( 
        <Modal
            onDismiss={handleDismiss}
            title="forgot password"
            confirmable>
            <label>type your email</label>
            <input type="email" onChange={e => setEmail(e.target.value)} />
        </Modal>
     ) : null;
}

export default ForgotPasswordModal;
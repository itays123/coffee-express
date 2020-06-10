import React, { useState, useContext } from 'react';
import Modal from '../shared/Modal';
import { AuthContext } from './AuthContext';

const ChangePasswordModal = ({ showModal, setModalShown }) => {
    const [password, setPassword] = useState('');
    const { changePassword } = useContext(AuthContext);

    const handleDismiss = confirm => {
        setModalShown(false);
        if (confirm && password && password.trim() !== '') changePassword(password);
    }

    return showModal ? ( 
        <Modal
            title="change password"
            onDismiss={handleDismiss}
            confirmable>
            <input type="password" placeholder="your new password..." 
                onChange={e => setPassword(e.target.value)} />
        </Modal>
     ): null;
}
 
export default ChangePasswordModal;
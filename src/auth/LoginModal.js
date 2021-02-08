import React, { useState, useContext } from 'react';
import AuthForm from './form/AuthForm';
import { AuthContext } from './AuthContext';
import Modal from '../layout/Modal/Modal';

const LoginModal = ({ showModal, setModalShown }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleDismiss = confirm => {
        setModalShown(false);
        if (confirm) {
            login(email, password);
            console.log(email, password);
        }
    }
    
    return showModal ? ( 
        <Modal
            confirmable
            confirmText="login"
            title="login"
            onDismiss={handleDismiss}>
            <AuthForm 
                onEmailChange={e => setEmail(e)}
                onPasswordChange={p => setPassword(p)} />
        </Modal>
    ) : null;
}
 
export default LoginModal;
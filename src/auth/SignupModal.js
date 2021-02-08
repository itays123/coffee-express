import React, { useState, useContext } from 'react';
import Modal from '../layout/Modal/Modal';
import AuthForm from './form/AuthForm';
import AddressForm from './address/AddressForm';
import { AuthContext } from './AuthContext';

const SignupModal = ({ showModal, setModalShown }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState({});
    const { signup } = useContext(AuthContext);

    const handleDismiss = confirm => {
        setModalShown(false);
        if (confirm) {
            signup(email, password, name, address);
        }
    }

    return showModal ? ( 
        <Modal
            confirmText="join"
            confirmable
            title="sign up"
            onDismiss={handleDismiss}>
                <label>Your Name</label>
                <input type="text" onChange={e => setName(e.target.value)} required />
                <AuthForm 
                    onEmailChange={e => setEmail(e)} 
                    onPasswordChange={p => setPassword(p)} />
                <label>Address (optional)</label>
                <AddressForm
                    onChange={a => setAddress(a)}
                    mode="edit" />
        </Modal>
     ): null;
}
 
export default SignupModal;
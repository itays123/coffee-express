import React, { useState, useContext } from 'react';
import Modal from '../shared/Modal';
import { AuthContext } from './AuthContext';
import AddressForm from './AddressForm';

const isAddressValid = ({ city, street, number }) => {
    return city && city !== ''
        && street && street !== ''
        && number && number !== '';
}

const ChangeAddressModal = ({ showModal, setModalShown }) => {
    const { user, changeAddress } = useContext(AuthContext);
    const [address, setAddress] = useState(user?.address || {});

    const handleDissmiss = confirm => {
        setModalShown(false);
        if (confirm && isAddressValid(address)) changeAddress(address);
    }

    return showModal ? ( 
        <Modal
            title="change address"
            onDismiss={handleDissmiss}
            confirmText="apply"
            confirmable>
            <AddressForm onChange={a => setAddress(a)} mode={ address === {} ? 'view' : 'edit' } />
        </Modal>
     ): null;
}
 
export default ChangeAddressModal;
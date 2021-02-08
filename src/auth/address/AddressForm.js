import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './AddressForm.css';

const getInitialAddress = user => {
    if (user && user.address) {
        const { city, street, number, apartment } = user.address;
        return { city, street, number, apartment };
    } else {
        return { city: '', street: '', number: '' };
    }
}

const formatAddress = ({ city, street, number, apartment }) => {
    let refrenceApartement = '';
    if (apartment) {
        refrenceApartement = `, apartment ${apartment}`;
    }
    return `${number} ${street}, ${city}${refrenceApartement}`;
}

const isAddressValid = ({ city, street, number }) => {
    return city && city !== ''
        && street && street !== ''
        && number && number !== '';
}

const AddressForm = ({ mode, onChange, showLabel }) => {
    if (!onChange) onChange = () => {};
    const { user } = useContext(AuthContext);
    const [isViewing, setViewing] = useState(mode === 'view');
    const [address, setAddress] = useState(getInitialAddress(user));
    const [isValid, setValid] = useState(false);

    const handleFormChange = ({target}) => {
        const newAddress = {...address, [target.id]: target.value };
        setAddress(newAddress);
        if (isAddressValid(newAddress)) {
            onChange(newAddress);
            setValid(true);
        } else {
            setValid(false);
        }   
    }

    const editMode = (
        <div className="edit-mode">
            <div className="form">
                <input type="text" value={address.number} id="number" 
                    onChange={handleFormChange} placeholder="number" required />
                <input type="text" value={address.street} id="street" 
                    onChange={handleFormChange} placeholder="street" required />
                <input type="text" value={address.city} id="city" 
                    onChange={handleFormChange} placeholder="city" required />
                <input type="text" value={address.apartment} id="apartment" 
                    onChange={handleFormChange} placeholder="apartment (optional)" />
            </div>
            <button onClick={() => setViewing(true)} disabled={!isValid}>
                <i className="material-icons">done</i>
            </button>
        </div>
    );

    const viewMode = (
        <div className="view-mode">
            <p>{ formatAddress(address) }</p>
            <button onClick={() => setViewing(false)}><i className="material-icons">edit</i></button>
        </div>
    );

    return ( 
        <div className="address card">
            { showLabel && <label>Your address</label> }
            { isViewing ? viewMode : editMode }
        </div>
     );
}
 
export default AddressForm;
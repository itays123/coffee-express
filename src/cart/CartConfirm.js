import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import Modal from '../layout/Modal/Modal';
import { AuthContext } from '../auth/AuthContext';
import AddressForm from '../auth/address/AddressForm';

const CartConfirm = ({ showModal, setModalShown }) => {
    const { orderCart, cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isAddressAvailable = user?.address?.city && user?.address?.city !== '';
    const [address, setAddress] = useState(isAddressAvailable ? user.address : {});

    const handleDismiss = confirmed => {
        setModalShown(false);
        if (confirmed) {
            const { city, street, number } = address;
            if (!city || !street || !number) return;
            orderCart(address);
        }
    }

    const cartList = cart.map(({ item, quantity }, index) => (
        <li key={index}>{ item.title }{ quantity > 1 && ` (x${quantity})` }</li>
    ))

    return showModal ? ( 
        <Modal
            title="confirm purchase"
            confirmable
            onDismiss={handleDismiss}>
            <h2>You ordered: </h2>
            <ul>
                { cartList }
            </ul>
            <h2>ship to: </h2>
            <AddressForm 
                mode={isAddressAvailable ? "view" : "edit"}
                onChange={a => setAddress(a)} />
        </Modal>
     ): null;
}
 
export default CartConfirm;
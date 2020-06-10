import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { AppContext } from '../app/AppContext';
import CartConfirm from './CartConfirm';
import { fetchOrderMany } from '../../fetch';

export const CartContext = createContext();

const getItemIndex = (cart, itemId) => {
    const idList = cart.map(cartItem => cartItem.item.id);
    return idList.indexOf(itemId);
}

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { token } = useContext(AuthContext);
    const { setLoading, notify } = useContext(AppContext);
    const [showCartModal, setCartModalShown] = useState(false);

    const addToCart = item => {
        const index = getItemIndex(cart, item.id);
        if (index === -1) {
            setCart(prevCart => ([
                ...prevCart,
                { item: item, quantity: 1 }
            ]));
        } else {
            setCart(prevCart => {
                const updatedCart = [...prevCart];
                const cartItem = updatedCart[index];
                const newQuantity = cartItem.quantity + 1;
                updatedCart[index] = { item: cartItem.item, quantity: newQuantity };
                return updatedCart;
            })
        }
    }

    const removeFromCart = (itemId) => {
        setCart(prevCart => [...prevCart].filter(({item}) => item.id !== itemId));
    }

    const getCartItemsCount = () => cart.reduce((prev, curr) => prev + curr.quantity, 0);

    const orderCart = (address = {city: 'new york, NY', street: 'Broadway', number: 1400}) => {
       setLoading(true);
       fetchOrderMany(token, cart, address)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setLoading(false);
            notify('cart ordered');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            notify('an error accured');
        })
    }

    const confirmCart = () => {
        setCartModalShown(true);
    }

    return ( 
        <CartContext.Provider value={{ cart, addToCart, getCartItemsCount, orderCart, confirmCart, removeFromCart }}>
            <CartConfirm showModal={showCartModal} setModalShown={setCartModalShown} />
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
import React, { useContext, useState } from 'react';
import { CartContext } from '../shared/CartContext';
import CartItem from '../shared/CartItem';
import '../../styles/pages/Cart.css';
import { AuthContext } from '../auth/AuthContext';
import { Redirect } from 'react-router-dom';

const Cart = () => {
    const { cart, confirmCart, removeFromCart } = useContext(CartContext);
    const [showOptions, setOptionsShown] = useState(false);
    const { token } = useContext(AuthContext);
    if (!token || token === 'null') return <Redirect to="/" />

    const cartItems = cart.map((cartItem) => (
        <CartItem {...cartItem} 
            key={cartItem.item.id} 
            onRemoveReq={() => removeFromCart(cartItem.item.id)}
            showOptions={showOptions} />
    ))

    return ( 
        <div className="cart">
            <header className="card">
                <h1>My Cart</h1>
                { cart.length > 0 && (
                    <button onClick={() => setOptionsShown(b => !b)}>
                        <i className="material-icons">{ showOptions ? 'done' : 'edit' }</i>
                    </button>
                )}
            </header>
            {cartItems}
            { cart.length > 0 && <button className="btn" onClick={() => confirmCart()}>Order</button> }
            { cart.length === 0 && <h4>This is where you see your orders</h4> }
        </div>
     );
}
 
export default Cart;
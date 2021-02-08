import React from 'react';
import './CartItem.css';
import CoffeeCup from '../offers/CoffeeCup/CoffeeCup';

const CartItem = ({ item, quantity, onRemoveReq, showOptions }) => {
    const { title } = item;
    return ( 
        <div className="cart-item card">
            <div className="item-info">
                { showOptions ? <button onClick={onRemoveReq}><i className="material-icons">remove</i></button> : null }
                <CoffeeCup ingredients={item.ingrediants} size={30} />
                <div>
                    <h2>{ title }</h2>
                </div>
            </div>
            { quantity > 1 && 
            <div className="quantity-info">
                <p>{ quantity }</p>
            </div> 
            }
        </div>
     );
}
 
export default CartItem;
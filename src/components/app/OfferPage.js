import React, { useContext } from 'react';
import { OfferContext } from '../shared/OfferContext';
import { CartContext } from '../shared/CartContext';
import { AuthContext } from '../auth/AuthContext';
import '../../styles/pages/OfferPage.css';
import CoffeeCup from '../shared/CoffeeCup';

const OfferPage = ({ match }) => {
    const { id } = match.params;
    const { getOfferById } = useContext(OfferContext);
    const offer = getOfferById(id);
    const { addToCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);

    const handleCartRequest = () => { 
        addToCart(offer);
    }

    return ( 
        <div className="offer-details">
            <header className="card">
                <h1>{ offer?.title }</h1>
                <div className="cup">
                    <CoffeeCup ingredients={offer?.ingrediants} />
                </div>  
            </header>
            <section className="card ing">
                <h3>Contains: </h3>
                <ul>
                    { offer?.ingrediants ? offer.ingrediants.map(({ name }, index) => (
                        <li key={index}>{name}</li>
                    )) : null }
                </ul>
            </section>
            { token && <button className="btn" onClick={handleCartRequest}>Add To Cart</button> }
            <p>added on { offer?.createdAt ? new Date(offer.createdAt).toLocaleDateString() : '5/24/2020' }</p>
        </div>
    );
}
 
export default OfferPage;
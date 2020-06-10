import React, { useContext } from 'react';
import '../../styles/ui/Offer.css';
import { Link } from 'react-router-dom';
import CoffeeCup from './CoffeeCup';
import { OfferContext } from './OfferContext';

const Offer = ({ offer }) => {
    let displayOffer = offer;

    const { getOfferById } = useContext(OfferContext);
    if (typeof offer === 'string') {
        displayOffer = getOfferById(offer);
    }

    return (
        <div className="offer card">
            <h3>{ displayOffer.title }</h3>
            <div className="offer-content">
                <CoffeeCup ingredients={displayOffer.ingrediants} />
                <div>
                    <p>{ displayOffer.createdAt ? new Date(displayOffer.createdAt).toLocaleDateString() : '5/24/2020' }</p>
                    <Link to={`/offer/${displayOffer.id}`}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}
 
export default Offer;
import React, { useContext } from 'react';
import Offer from './Offer';
import { OfferContext } from '../OfferContext';

const LastOffers = ({ limit }) => {
    const { getLastOffers } = useContext(OfferContext)
    const offers = getLastOffers();

    const offerList = limit ? offers.slice(0, limit) : offers;

    return ( 
        <div className="last-offers offers-collection">
            { offerList.map((o, index) => <Offer offer={o} key={o.id || index} />) }
        </div>
     );
}
 
export default LastOffers;
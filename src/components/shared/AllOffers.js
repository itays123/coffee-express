import React, { useContext } from 'react';
import Offer from './Offer';
import { OfferContext } from './OfferContext';

const AllOffers = () => {
    const { offers } = useContext(OfferContext);

    return ( 
        <div className="last-offers offers-collection">
            { offers.map((o, index) => <Offer offer={o} key={o.id || index} />) }
        </div>
     );
}
 
export default AllOffers;
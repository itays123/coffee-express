import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { fetchOffers } from '../fetch';
import { AppContext } from '../layout/AppContext';

export const OfferContext = createContext();

const OfferContextProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [offers, setOffers] = useState([]);
    const { setLoading } = useContext(AppContext);

    const getOffers = () => {
        setLoading(true);
        fetchOffers()
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.errors) {
                    return;
                } else {
                    setOffers(res.data.offers);
                }
            })
            .catch(err => {
                setLoading(false);
                setTimeout(getOffers, 1000);
            })
    }

    // eslint-disable-next-line
    useEffect(getOffers, []);

    const getLastOffers = () => { 
        // to prevent cases when user is signed in but the offers arent loaded yet:
        if (offers.length === 0) return [];
        
        const isSignedIn = token && token !== 'null';
        if (isSignedIn && user.lastOffers) {
            return user.lastOffers.length > 2 ? [ ...(new Set(user.lastOffers)) ] : [...offers].reverse();
        } else return [...offers].reverse();
    };
    const getOfferById = id => {
        const ids = offers.map(offer => offer.id);
        const index = ids.indexOf(id);
        if (index === -1) return null;
        return offers[index];
    }

    return ( 
        <OfferContext.Provider value={{ offers, getLastOffers, getOfferById }} >
            { children }
        </OfferContext.Provider>
     );
}
 
export default OfferContextProvider;
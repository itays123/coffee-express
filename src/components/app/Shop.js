import React, { useContext } from 'react';
import '../../styles/pages/Shop.css';
import LastOffers from '../shared/LastOffers';
import AllOffers from '../shared/AllOffers';
import { AuthContext } from '../auth/AuthContext';
import { Redirect } from 'react-router-dom';

const Shop = () => {
    const { token } = useContext(AuthContext);
    if (!token || token === 'null') return <Redirect to="/" />

    return ( 
        <div className="shop">
            <header>
                <h2>Latest Offers</h2>
                <LastOffers limit={3} />
            </header>
            <section className="offers">
                <h2>Offers</h2>
                <AllOffers />
            </section>
        </div>
     );
}
 
export default Shop;
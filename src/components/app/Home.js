import React, { useContext } from 'react';
import '../../styles/pages/Home.css';
import logo from '../../res/logo.png';
import Feedback from './Feedback';
import LastOffers from '../shared/LastOffers';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Home = () => {
    const { token, AuthModals } = useContext(AuthContext);

    const aboutText = (
        <p>
            We are Coffee Express.<br />
            Our goal is to make you happy<br />
            with our delicious coffee. <br />
            we alaways keep pushing to<br />
            offer the best customer service, but if you<br />
            think we need to do better, please <br />
            contact us in the form below.
        </p>
    )

    return ( 
        <div className="home">
            <header className="card">
                <img src={logo} alt='' />
                <h1>The Best Coffee In The Galaxy!</h1>
            </header>
            <section className="available-sails">
                <h2>Available sails</h2>
                <LastOffers limit={3} />
            </section>
            {(token && token !== 'null') ? 
                <p>To learn more, go to <Link to="/shop">shop</Link></p> :  // eslint-disable-next-line
                <p><a onClick={() => AuthModals.login()}>Login</a> to see more</p>
            }
            <section className="about card">
                <h2>About us</h2>
                { aboutText }
            </section>
            <section className="contact card">
                <h2>Contact us</h2>
                <Feedback />
            </section>
        </div>
     );
}
 
export default Home;
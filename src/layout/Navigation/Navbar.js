import React, { useState, useContext } from 'react';
import NavItem from './NavItem';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { AuthContext } from '../../auth/AuthContext';

const Navbar = () => {
    const [isHamburgerOpen, setHamburgerOpen] = useState(false);
    const { token } = useContext(AuthContext);
    const routes = (token && token !== 'null') ? <SignedInLinks /> : <SignedOutLinks />;

    return [( 
        <nav 
            key="hamburger" 
            className={`navbar ${ isHamburgerOpen ? 'active' : 'disabled' }`} 
            onMouseEnter={() => setHamburgerOpen(true)}
            onMouseLeave={() => setHamburgerOpen(false)}>
            <header>
                <NavItem route="menu" highlight options={{
                    disableLink: true,
                    displayTitle: 'Coffee Express',
                    clickEvent: () => setHamburgerOpen(b => !b)
                }} />
            </header>
            <section className="navigation">{ routes }</section>
        </nav>
     ), (
         <div key="mobile-access" className="mobile-header">
             <NavItem route="menu" highlight options={{
                disableLink: true,
                displayTitle: 'Coffee Express',
                clickEvent: () => setHamburgerOpen(true)
            }} />
         </div>
     )];
}
 
export default Navbar;
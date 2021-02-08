import React from 'react';
import './Navitem.css';
import { NavLink } from 'react-router-dom';

const mapRouteToIcon = {
    'menu': 'menu',
    '': 'home',
    'cart': 'shopping_cart',
    'shop': 'shopping_basket',
    'login': 'fingerprint',
    'signup': 'person_add',
}

const NavItem = ({ route, options, highlight }) => {
    if (!options) options = {};
    const { disableLink, clickEvent, displayTitle, showStatus, getStatusState } = options;

    const innerContent = [
        <div key="icon" className="icon"><i className="material-icons">{ mapRouteToIcon[route] }</i></div>, 
        <span key="title">{ displayTitle || route }</span>
    ]

    return ( 
        <div className={`nav-item ${route}${highlight ? ' highlighted' : ''}`}>{disableLink ? 
            <button onClick={() => clickEvent && clickEvent()}>
                { innerContent }
            </button> :
            <NavLink exact to={`/${route}`}>
                { innerContent }
            </NavLink>}
            { showStatus ? <div className="status">{ getStatusState && getStatusState() }</div> : null }
        </div>
     );
}
 
export default NavItem;
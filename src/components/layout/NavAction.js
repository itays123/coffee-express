import React from 'react';
import '../../styles/global/NavAction.css';

const mapActionToIcon = {
    'password': 'vpn_key',
    'address': 'gps_fixed',
    'sign-out': 'exit_to_app'
}

const NavAction = ({ action, onClick, displayTitle }) => {
    return ( 
        <div className={`nav-action ${action}`} onClick={() => onClick && onClick()}>
            <span>{ displayTitle || action }</span>
            <div className="icon">
                <i className="material-icons">{ mapActionToIcon[action] }</i>
            </div>
        </div>
     );
}
 
export default NavAction;
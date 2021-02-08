import React, { useContext } from 'react';
import NavItem from './NavItem';
import NavAction from '../../layout/Navigation/NavAction';
import { AuthContext } from '../../auth/AuthContext';

const SignedOutLinks = () => {
    const { AuthModals } = useContext(AuthContext);

    return [(
        <div className="links" key="links">
            <NavItem route="" options={{
                displayTitle: 'home'
            }}/>
            <NavItem route="signup" options={{
                displayTitle: 'join us',
                disableLink: true,
                clickEvent: () => AuthModals.signup()
            }} />
            <NavItem route="login" options={{
                displayTitle: 'log in',
                disableLink: true,
                clickEvent: () => AuthModals.login()
            }} />
        </div>
    ), (
        <div className="actions" key="actions">
            <NavAction
                displayTitle="forgot password"
                action="password"
                onClick={() => AuthModals.forgotPassword()} />
        </div>
    )]
}
 
export default SignedOutLinks;
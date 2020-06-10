import React, { useContext } from 'react';
import NavItem from './NavItem';
import NavAction from './NavAction';
import { CartContext } from '../shared/CartContext';
import { AuthContext } from '../auth/AuthContext';

const SignedInLinks = () => {
    const { getCartItemsCount } = useContext(CartContext);
    const itemsInCart = getCartItemsCount();
    const { signout, AuthModals } = useContext(AuthContext);
    return [(
        <div className="links" key="links">
            <NavItem route="" options={{
                displayTitle: 'home'
            }}/>
            <NavItem route="shop" />
            <NavItem route="cart" options={{
                showStatus: itemsInCart  && itemsInCart > 0,
                getStatusState: () => getCartItemsCount()
            }} />
        </div>
    ), (
        <div className="actions" key="actions">
            <NavAction
                displayTitle="change password"
                action="password"
                onClick={() => AuthModals.changePassword()} />
            <NavAction
                displayTitle="change my address"
                action="address"
                onClick={() => AuthModals.changeAddress()} />
            <NavAction 
                displayTitle="log out"
                action="sign-out"
                onClick={() => signout()} />
        </div>
    )]
}
 
export default SignedInLinks;
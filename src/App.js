import React from 'react';
import './App.css';
import AppContextProvider from './layout/AppContext';
import Navbar from './layout/Navigation/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './layout/Home';
import Shop from './offers/Shop';
import CartContextProvider from './cart/CartContext';
import OfferContextProvider from './offers/OfferContext';
import OfferPage from './offers/OfferPage';
import Cart from './cart/Cart';
import AuthContextProvider from './auth/AuthContext';
import ForgotPassword from './auth/password/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Navbar />
            <OfferContextProvider>
              <div className="content">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/offer/:id" component={OfferPage} />
                  <Route path="/password/:token" component={ForgotPassword} />
                </Switch>
              </div>
            </OfferContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;

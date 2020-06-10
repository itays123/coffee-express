import React from 'react';
import './styles/global/App.css';
import AppContextProvider from './components/app/AppContext';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/app/Home';
import Shop from './components/app/Shop';
import CartContextProvider from './components/shared/CartContext';
import OfferContextProvider from './components/shared/OfferContext';
import OfferPage from './components/app/OfferPage';
import Cart from './components/app/Cart';
import AuthContextProvider from './components/auth/AuthContext';
import ForgotPassword from './components/auth/ForgotPassword';

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

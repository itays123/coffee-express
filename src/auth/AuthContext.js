import React, { createContext, useState, useContext } from 'react';
import ChangePasswordModal from './password/ChangePasswordModal';
import ChangeAddressModal from './address/ChangeAddressModal';
import { fetchLogin, fetchSignup, fetchForgotPassword, fetchChangePassword, fetchChangeAddress } from '../fetch';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { AppContext } from '../layout/AppContext';
import ForgotPasswordModal from './password/ForgotPasswordModal';

export const AuthContext = createContext();

const saveUserData = (userState, tokenState) => {
    localStorage.setItem('token', tokenState);
    localStorage.setItem('user', JSON.stringify(userState));
}

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [currentModal, setCurrentModal] = useState(null);
    const { setLoading, notify } = useContext(AppContext);

    const login = (email, password) => {
        setLoading(true);
        fetchLogin(email, password)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.errors) {
                    notify('auth failed')
                } else {
                    setUser(res.data.login.token);
                    setToken(res.data.login.user);
                    saveUserData(res.data.login.user, res.data.login.token);
                    notify('logged in successfully')
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                notify('an error accured, please try again')
            })
    };

    const signup = (email, password, name, address = {}) => {
        if (!address.city || address.city.trim() === '' || 
            !address.street || address.street.trim() === '' || 
            !address.number || address.number.trim() === '') {
                address = {};
        }
        setLoading(true);
        fetchSignup(email, password, name, address)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.errors) {
                    notify(res.errors[0].message);
                } else {
                    setUser(res.data.signup.token);
                    setToken(res.data.signup.user);
                    saveUserData(res.data.signup.user, res.data.signup.token);
                    notify('signed up successfully')
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                notify('an error accured, please try again');
            })
    };

    const signout = () => {
        setUser(null);
        setToken(null);
        saveUserData(null, null);
    }

    const forgotPassword = email => {
        fetchForgotPassword(email)
            .catch(err => {
                console.log(err);
                notify('an error accured, please try again')
            })
    }

    const changePassword = password => {
        fetchChangePassword(token, password)
            .catch(err => {
                console.log(err);
                notify('an error accured while changing password, please try again')
            })
    };

    const changeAddress = address => {
        setLoading(true);
        fetchChangeAddress(token, address)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if(res.errors) {
                    notify(res.errors[0].message);
                } else {
                    notify('address changed')
                    setUser(prevUser => ({
                        ...prevUser,
                        address: res.data.changeAddress.address
                    }));
                }
            })
            .catch(err => {
                notify('an error accured, please try again')
                console.log(err);
                setLoading(false);
            })
    };

    const AuthModals = {
        changePassword: () => setCurrentModal('change-password'),
        changeAddress: () => setCurrentModal('change-address'),
        forgotPassword: () => setCurrentModal('forgot-password'),
        login: () => setCurrentModal('login'),
        signup: () => setCurrentModal('signup')
    }

    return ( 
        <AuthContext.Provider value={{ 
            token, 
            user, 
            login, 
            signup, 
            signout,
            forgotPassword,
            changePassword,
            changeAddress,
            AuthModals
            }}>
            <ChangePasswordModal 
                showModal={currentModal === 'change-password'}
                setModalShown={b => setCurrentModal(b ? 'change-password' : null)} />
            <ChangeAddressModal 
                showModal={currentModal === 'change-address'}
                setModalShown={b => setCurrentModal(b ? 'change-address' : null)} />
            <ForgotPasswordModal
                showModal={currentModal === 'forgot-password'}
                setModalShown={b => setCurrentModal(b ? 'forgot-password' : null)} />
            <LoginModal
                showModal={currentModal === 'login'}
                setModalShown={b => setCurrentModal(b ? 'login' : null)} />
            <SignupModal
                showModal={currentModal === 'signup'}
                setModalShown={b => setCurrentModal(b ? 'login' : null)} />
            { children }
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
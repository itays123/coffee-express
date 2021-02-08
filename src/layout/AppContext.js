import React, { createContext, useState } from 'react';
import Loading from './Loading/Loading';
import Notification from './Modal/Notification';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: 'notification' });

    const notify = message => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    }

    return ( 
        <AppContext.Provider value={{ setLoading, notify }}>
            { isLoading && <Loading /> }
            { notification.show && <Notification message={notification.message} /> }
            { children }
        </AppContext.Provider>
    );
}
 
export default AppContextProvider;
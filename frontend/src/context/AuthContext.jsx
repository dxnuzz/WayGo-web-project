import React, { createContext, useState } from 'react';
import { setCookie, getCookie, removeCookie } from '../utils/cookieUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const cookieUser = getCookie('WayGo_session');
        if (cookieUser) return cookieUser;
        const sessionUser = sessionStorage.getItem('WayGo_user');
        if (sessionUser) return JSON.parse(sessionUser);
        const storedUser = localStorage.getItem('WayGo_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        setCookie('WayGo_session', userData, 7);
        sessionStorage.setItem('WayGo_user', JSON.stringify(userData));
        localStorage.setItem('WayGo_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        removeCookie('WayGo_session');
        sessionStorage.removeItem('WayGo_user');
        localStorage.removeItem('WayGo_user');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

import React from 'react';
import 'isomorphic-fetch';
import moment from 'moment';

import Routes from './routes';
import AuthProvider from './containers/AuthProvider';
import AppContext from './contexts/app.js';

import './i18n';
import './index.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ScrollToTop from './components/ScrollToTop.jsx';
import Theme from './containers/Theme';
import StartupContainer from './containers/StartupContainer';

const App = ({
    getNow = () => moment(),
    cookies,
    notFoundEvent = () => {},
    acceptedCookies = () => null,
}) => (
    <StartupContainer>
        <AppContext.Provider
            value={{
                getNow,
                cookies,
                notFoundEvent,
                acceptedCookies,
            }}
        >
            <Theme>
                <ScrollToTop>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </ScrollToTop>
            </Theme>
        </AppContext.Provider>
    </StartupContainer>
);

export default App;

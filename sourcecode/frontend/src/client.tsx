import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import expirePlugin from 'store/plugins/expire';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/client';
import Cookies from 'js-cookie';

import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClientUtils from './helpers/apolloClient';
// import tracking from './helpers/tracking.js';
import './reportWebVitals';

const apolloClientUtils = new ApolloClientUtils();

// tracking.startSession();
store.addPlugin(expirePlugin);

loadableReady().then(() => {
    ReactDOM.hydrate(
        <ApolloProvider client={apolloClientUtils.apolloClient}>
            <BrowserRouter>
                <App
                    cookies={{
                        isAdmin: Cookies.get('isAdmin'),
                    }}
                    acceptedCookies={() => Cookies.get('acceptedCookies')}
                />
            </BrowserRouter>
        </ApolloProvider>,
        document.getElementById('root')
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
    module.hot.accept();
}

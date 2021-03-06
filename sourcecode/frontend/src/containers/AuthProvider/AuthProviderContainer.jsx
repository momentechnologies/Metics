import React from 'react';
import { gql } from '@apollo/client';

import startupContext from '../../contexts/startup.js';
import AuthProvider from './AuthProvider';

export const authFragment = gql`
    fragment AuthFragment on Query {
        auth {
            user {
                id
                firstName
                lastName
                email
                emailConfirmed
                organizations {
                    id
                    name
                }
            }
        }
    }
`;

const AuthProviderContainer = (props) => {
    const { refetch, writeData, ...data } = React.useContext(startupContext);
    const [isLoggedOut, setIsLoggedOut] = React.useState(false);

    const logout = () => {};

    React.useEffect(() => {
        if (!data && isLoggedOut) {
            setIsLoggedOut(false);
        }
    }, [data, setIsLoggedOut, isLoggedOut]);

    return (
        <AuthProvider
            loading={false}
            data={data}
            refetch={refetch}
            logout={() => {
                setIsLoggedOut(true);
                try {
                    logout().then(() => {
                        writeData({
                            auth: null,
                        });

                        setIsLoggedOut(false);
                    });
                } catch (e) {
                    console.error(e);
                }
            }}
            isLoggedOut={isLoggedOut}
        >
            {props.children}
        </AuthProvider>
    );
};

export default AuthProviderContainer;

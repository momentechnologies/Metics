import React from 'react';
import Register from './Register';
import { gql } from '@apollo/client';
import useMutation from '../../../hooks/useMutation';

const registerMutation = gql`
    mutation CreateAccount($data: CreateAccountInput!) {
        createAccount(data: $data)
    }
`;

const RegisterController = () => {
    const { mutate: register, status: registerStatus } = useMutation(
        registerMutation,
        {
            message:
                'Something happened while creating your account. Please refresh or try later.',
            key: 'server_error',
            error: {},
        }
    );

    return <Register register={register} status={registerStatus} />;
};

export default RegisterController;

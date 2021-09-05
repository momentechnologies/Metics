import React from 'react';
import { useMutation } from '@apollo/client';
import getGraphqlError from '../helpers/getGraphqlError';

export default (mutationGql, defaultError) => {
    const [mutation] = useMutation(mutationGql);

    const [status, setStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return {
        status,
        mutate: (variables, clb) => {
            setStatus({
                error: false,
                success: false,
                loading: true,
            });
            mutation({
                variables,
            })
                .then(({ data }) => {
                    setStatus({
                        error: false,
                        success: true,
                        loading: false,
                    });
                    clb && clb(data);
                })
                .catch((error) => {
                    console.error(error);
                    setStatus({
                        error: getGraphqlError(error, defaultError),
                        success: false,
                        loading: false,
                    });
                });
        },
    };
};

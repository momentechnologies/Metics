export default (
    requestError,
    defaultValue = {
        message: 'Something happened',
        key: 'something_happened',
        error: {},
    }
) => {
    if (
        !requestError ||
        !requestError.graphQLErrors ||
        !Array.isArray(requestError.graphQLErrors) ||
        requestError.graphQLErrors.length === 0
    ) {
        return defaultValue;
    }

    if (requestError.graphQLErrors[0].type === 'validation') {
        return {
            ...requestError.graphQLErrors[0],
            errorByKey: requestError.graphQLErrors[0].error.messages.reduce(
                (errorByKey, error) => {
                    if (!errorByKey[error.key]) {
                        errorByKey[error.key] = [];
                    }
                    errorByKey[error.key].push(error.message);
                    return errorByKey;
                },
                {}
            ),
        };
    }

    return requestError.graphQLErrors[0];
};

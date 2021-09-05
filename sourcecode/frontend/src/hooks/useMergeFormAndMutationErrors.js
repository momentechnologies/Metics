export default (reactHooksErrors, mutationErrors) => {
    if (Object.keys(reactHooksErrors).length !== 0) {
        return Object.entries(reactHooksErrors).reduce(
            (errors, [key, { message }]) => ({
                ...errors,
                [key]: [message],
            }),
            {}
        );
    }

    if (mutationErrors && mutationErrors.errorByKey) {
        return mutationErrors.errorByKey;
    }

    return {};
};

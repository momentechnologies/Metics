import React from 'react';

const BreadcrumbContext = React.createContext({
    paths: [],
});

export const createPath = (name: string, path: string) => ({
    name,
    path,
});

export type Path = ReturnType<typeof createPath>;

export const BreadcrumbPath = ({ name, path, children }) => {
    const { paths } = React.useContext(BreadcrumbContext);

    return (
        <BreadcrumbContext.Provider
            value={{
                paths: [...paths, createPath(name, path)],
            }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};

export default BreadcrumbContext;

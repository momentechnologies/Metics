import React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import Link from './Link';
import BreadcrumbContext from '../contexts/breadcrumb';

const Breadcrumb = ({ currentName }: { currentName: string }) => {
    const { paths } = React.useContext(BreadcrumbContext);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {paths.map(({ path, name }, index) => (
                <Link key={index} color="inherit" to={path}>
                    {name}
                </Link>
            ))}
            <Typography color="textPrimary">{currentName}</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;

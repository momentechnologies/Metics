import React from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import {
    Assessment,
    Dashboard,
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';
import OrganizationContext from '../../contexts/organization';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    parentItem: {
        fontWeight: 'bold',
    },
}));

const Sidebar = () => {
    const { organization, paths } = React.useContext(OrganizationContext);
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [currentlyExpandedName, setCurrentlyExpandedName] =
        React.useState(null);

    React.useEffect(() => {
        setCurrentlyExpandedName(null);
    }, [location]);

    const links = [
        {
            name: organization.name,
            to: `${paths.root}`,
            icon: <Dashboard />,
            subLinks: [{ name: 'Billing', to: '/billing' }],
        },
        {
            name: 'Projects',
            to: `${paths.root}/projects`,
            icon: <Dashboard />,
        },
        {
            name: 'Stats',
            to: `${paths.root}/stats`,
            icon: <Assessment />,
        },
    ];

    return (
        <List dense>
            {links.map(({ name, icon, to, subLinks }) => {
                const isInPath = !!matchPath(location.pathname, {
                    path: to,
                    strict: false,
                });

                const isExpanded = isInPath || currentlyExpandedName === name;

                if (subLinks) {
                    return (
                        <React.Fragment key={name}>
                            <ListItem
                                button
                                selected={isInPath}
                                onClick={() => {
                                    setCurrentlyExpandedName(
                                        currentlyExpandedName === name
                                            ? null
                                            : name
                                    );
                                }}
                            >
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText
                                    primary={name}
                                    primaryTypographyProps={{
                                        className: classes.parentItem,
                                    }}
                                    inset={!icon}
                                />
                                {isExpanded ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse
                                in={isExpanded}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding dense>
                                    {subLinks.map((subLink) => {
                                        const subTo = to + subLink.to;
                                        const isInSubPath = !!matchPath(
                                            location.pathname,
                                            {
                                                path: subTo,
                                                strict: false,
                                            }
                                        );

                                        return (
                                            <ListItem
                                                key={subLink.name}
                                                button
                                                onClick={() =>
                                                    history.push(subTo)
                                                }
                                                selected={isInSubPath}
                                            >
                                                <ListItemText
                                                    primary={subLink.name}
                                                    inset
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    );
                }

                return (
                    <ListItem
                        key={name}
                        button
                        selected={isInPath}
                        onClick={() => history.push(to)}
                    >
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText
                            primary={name}
                            primaryTypographyProps={{
                                className: classes.parentItem,
                            }}
                            inset={!icon}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Sidebar;

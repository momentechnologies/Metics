import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import Sidebar from './Sidebar';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        backgroundColor: '#F6F6F7',
        minHeight: '100vh',
    },
}));

const Page = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <Sidebar />
                </div>
            </Drawer>
            <main className={classes.content}>{children}</main>
        </div>
    );
};

export default Page;

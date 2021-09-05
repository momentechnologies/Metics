import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import OrganizationContext from '../../../../../../../../../contexts/organization';

const Home = () => {
    const { paths } = React.useContext(OrganizationContext);

    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutline />}
                        component={Link}
                        to={paths.projects + '/create'}
                    >
                        Create project
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;

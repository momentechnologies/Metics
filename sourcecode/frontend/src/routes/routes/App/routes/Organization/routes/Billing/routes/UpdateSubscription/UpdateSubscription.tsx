import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Breadcrumb from '../../../../../../../../../components/Breadcrumb';

const UpdateSubscription = () => {
    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid item xs={12}>
                    <Breadcrumb currentName="Update subscription" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Update Subscription
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>Sub 1</Grid>
            </Grid>
        </Container>
    );
};

export default UpdateSubscription;

import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const CardWrapper = (props) => (
    <Card
        style={{
            height: '100%',
            ...props.style,
        }}
        {...props}
    />
);

const Billing = ({
    urls,
}: {
    urls: {
        updateSubscription: string;
    };
}) => {
    return (
        <Container maxWidth={false}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Billing
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardWrapper variant="outlined">
                        <CardContent>
                            <Box marginBottom={1}>Current plan</Box>
                            <Typography variant="h5" display="block">
                                Free plan
                            </Typography>
                            <Box marginTop={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component={Link}
                                    to={urls.updateSubscription}
                                >
                                    Upgrade
                                </Button>
                            </Box>
                        </CardContent>
                    </CardWrapper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardWrapper variant="outlined">
                        <CardContent>
                            <Box marginBottom={1}>Errors this period</Box>
                            <Typography variant="h5" display="block">
                                100
                            </Typography>
                        </CardContent>
                    </CardWrapper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Billing;

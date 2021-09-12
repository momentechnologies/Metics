import React from 'react';
import {
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    CardActionArea,
    Box,
} from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import OrganizationContext from '../../../../../../../../../contexts/organization';

const Home = ({ groups, currentUrl }) => {
    const { paths } = React.useContext(OrganizationContext);
    const history = useHistory();

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
            {groups.map((group) => (
                <React.Fragment key={group.id}>
                    <Grid container>
                        <Grid item>
                            <Box marginY={2}>{group.name}</Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        {group.projects.map((project) => (
                            <Grid item key={project.id} xs={12} sm={6} md={4}>
                                <Card
                                    variant="outlined"
                                    onClick={() =>
                                        history.push(
                                            `${currentUrl}/${project.id}`
                                        )
                                    }
                                >
                                    <CardActionArea>
                                        <CardContent>
                                            {project.name}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default Home;

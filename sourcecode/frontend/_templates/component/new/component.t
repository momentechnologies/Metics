---
to: src/<%=path%>/<%=name%>/<%=name%>.tsx
---
import React from 'react';
import { Container, Grid } from '@material-ui/core';

const <%=name%> = () => {
    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid item><%=name%></Grid>
            </Grid>
        </Container>
    );
};

export default <%=name%>;



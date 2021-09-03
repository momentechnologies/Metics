import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
    organizationName: Joi.string().min(2).max(100).required(),
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required(),
    password: Joi.string().min(8).max(255).required(),
});

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });
    const onSubmit = (data) => console.log(data);

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Controller
                            name="organizationName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Name of your organization"
                                    error={errors.organizationName}
                                    helperText={
                                        errors.organizationName &&
                                        'Organization name is required and must be between 2 and 100 characters long'
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="First name"
                                    error={errors.firstName}
                                    helperText={
                                        errors.firstName &&
                                        'First name is required and must be between 2 and 100 characters long'
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Last name"
                                    error={errors.lastName}
                                    helperText={
                                        errors.lastName &&
                                        'First name is required and must be between 2 and 100 characters long'
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    error={errors.email}
                                    helperText={
                                        errors.email &&
                                        'Email is required and must be valid and must be no longer than 255 characters'
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    error={errors.password}
                                    helperText={
                                        errors.password &&
                                        'Password is required and must be between 8 and 255 characters long'
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Create account
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;

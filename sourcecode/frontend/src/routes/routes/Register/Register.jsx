import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField,
} from '@material-ui/core';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import useMergeFormAndMutationErrors from '../../../hooks/useMergeFormAndMutationErrors';

const schema = Joi.object({
    organizationName: Joi.string().min(2).max(100).required(),
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required(),
    password: Joi.string().min(8).max(255).required(),
    acceptTermsAndPolicy: Joi.boolean().invalid(false).required(),
});

const Register = ({ register, status }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = (data) => {
        register({
            data,
        });
    };

    const mergedErrors = useMergeFormAndMutationErrors(errors, status.error);
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
                                    error={mergedErrors.organizationName}
                                    helperText={
                                        mergedErrors.organizationName &&
                                        mergedErrors.organizationName[0]
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
                                    error={mergedErrors.firstName}
                                    helperText={
                                        mergedErrors.firstName &&
                                        mergedErrors.firstName[0]
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
                                    error={mergedErrors.lastName}
                                    helperText={
                                        mergedErrors.lastName &&
                                        mergedErrors.lastName[0]
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
                                    error={mergedErrors.email}
                                    helperText={
                                        mergedErrors.email &&
                                        mergedErrors.email[0]
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
                                    error={mergedErrors.password}
                                    helperText={
                                        mergedErrors.password &&
                                        mergedErrors.password[0]
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="acceptTermsAndPolicy"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            name="acceptTermsAndPolicy"
                                            color="primary"
                                        />
                                    }
                                    label="I agree to the terms of service and privacy policy"
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
                    {errors.acceptTermsAndPolicy && (
                        <FormHelperText error>
                            You must accept in order to create an account
                        </FormHelperText>
                    )}
                    {status.error && (
                        <FormHelperText error>
                            {status.error.message}
                        </FormHelperText>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default Register;

import React from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import useMergeFormAndMutationErrors from '../../../../../../../../../hooks/useMergeFormAndMutationErrors';
import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    groupId: Joi.number().min(1).required(),
});

const Create = ({ create, status, groups, organization }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            name: '',
            groupId: groups[0].id,
        },
    });

    const onSubmit = (data) => {
        create({
            data,
        });
    };

    const mergedErrors = useMergeFormAndMutationErrors(errors, status.error);

    return (
        <Container maxWidth={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Create new project</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box my={1} />
                    </Grid>
                    <Grid item md={4}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Project name"
                                    error={mergedErrors.name}
                                    helperText={
                                        mergedErrors.name &&
                                        mergedErrors.name[0]
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item md={8} />
                    <Grid item md={4}>
                        <Controller
                            name="groupId"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Group</InputLabel>
                                    <Select {...field}>
                                        {groups.map((group) => (
                                            <MenuItem
                                                value={group.id}
                                                key={group.id}
                                            >
                                                {group.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Create
                        </Button>
                    </Grid>
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

export default Create;

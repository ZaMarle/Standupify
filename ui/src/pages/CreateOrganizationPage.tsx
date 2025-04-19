import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import ICreateOrganizationForm from '../interfaces/ICreateOrganizationForm';
import ApiClient from '../dataAccess/ApiClient';
import { useAuth } from '../components/AuthContext';

function CreateOrganizationPage() {
    const authContext = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateOrganizationForm>();

    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const onSubmit = (data: ICreateOrganizationForm) => {
        setIsFormSubmitting(true);

        console.log('submit');
        console.log(data);

        const apiClient = new ApiClient(authContext);
        apiClient.organizations.create(data);

        setIsFormSubmitting(false);
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 1 }}>
                Create organization
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <TextField
                    label="Name"
                    type="text"
                    autoComplete="off"
                    sx={{ width: '100%' }}
                    {...register('name', {
                        required: 'Name is required', // Validation rule
                    })}
                    error={!!errors.name} // Show error styling when error exists
                    helperText={errors.name?.message?.toString()} // Display the error message
                />
                <div style={{ marginTop: 16, float: 'right' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {isFormSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Create'
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
}
{
    /* // <div>
        //     <div>CreateOrganizationPage</div>
        // </div> */
}

export default CreateOrganizationPage;

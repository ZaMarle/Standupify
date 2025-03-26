import {
    AppBar,
    Box,
    Button,
    Card,
    Container,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ICreateUserForm from '../interfaces/ICreateUserForm';
import ApiClient from '../dataAccess/api';

function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ICreateUserForm>();

    // Watch the password field to compare with confirm password
    const password = watch('password');

    const onSubmit = (data: ICreateUserForm) => {
        console.log(data);
        const apiClient = new ApiClient();
        apiClient.users.create(data);
    };

    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                height: '100%',
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Vevous
                    </Typography>
                    <Button
                        onClick={() => navigate('/signin')}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Sign in
                    </Button>
                </Toolbar>
            </AppBar>
            {/*  */}
            <Container
                maxWidth="xs"
                style={{
                    alignContent: 'center',
                }}
            >
                <Card sx={{ width: '100%', padding: 2 }}>
                    <Typography
                        sx={{ alignSelf: 'baseline', mb: 2 }}
                        variant="h6"
                    >
                        Create an account
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '100%' }}
                    >
                        {/* First name */}
                        <TextField
                            variant="outlined"
                            label="First name"
                            type="text"
                            sx={{ width: '100%' }}
                            {...register('firstName', {
                                required: 'First name is required',
                                maxLength: {
                                    value: 16,
                                    message:
                                        'First name cannot exceed 16 characters',
                                },
                            })}
                            error={!!errors.firstName} // Show error styling when error exists
                            helperText={errors.firstName?.message?.toString()} // Display the error message
                        />
                        {/* Last name */}
                        <TextField
                            label="Last name"
                            type="text"
                            sx={{ mt: 2, width: '100%' }}
                            {...register('lastName', {
                                required: 'Last name is required',
                                maxLength: {
                                    value: 16,
                                    message:
                                        'First name cannot exceed 16 characters',
                                },
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message?.toString()}
                        />
                        {/* Email */}
                        <TextField
                            label="Email"
                            type="email"
                            sx={{ mt: 2, width: '100%' }}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email format',
                                },
                                maxLength: {
                                    value: 254,
                                    message:
                                        'First name cannot exceed 16 characters',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message?.toString()}
                        />
                        {/* Password */}
                        <TextField
                            label="Password"
                            type="password"
                            sx={{ mt: 2, width: '100%' }}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        'Password must be less than 20 characters',
                                },
                                // pattern: {
                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                //     message:
                                //         'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                                // },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message?.toString()}
                        />
                        {/* Confirm Password */}
                        <TextField
                            label="Confirm Password"
                            sx={{ mt: 2, width: '100%' }}
                            type="password"
                            fullWidth
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === password ||
                                    'Passwords do not match',
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message?.toString()}
                        />
                        <div style={{ marginTop: 16, float: 'right' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </div>
    );
}

export default SignUpPage;

import {
    TextField,
    Button,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Card,
    CircularProgress,
    Fade,
    Slide,
    SlideProps,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ApiClient from '../dataAccess/api';
import ISignInForm from '../interfaces/ISignInForm';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Info } from '@mui/icons-material';
import { useAuth } from '../AuthContext';

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInForm>();

    const { signIn } = useAuth();

    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const [isInvalid, setIsInvalid] = useState(false);
    const onSubmit = (data: ISignInForm) => {
        setIsFormSubmitting(true);
        console.log(data);

        const apiClient = new ApiClient();
        apiClient.auth
            .signIn(data)
            .then((res) => {
                console.log('Then');
                console.log(res);

                if (res.ok) {
                    res.text().then((text) => {
                        console.log(text);
                        signIn(text);
                        // navigate('/');
                    });
                } else {
                    setIsInvalid(true);
                }
            })
            .catch((res) => {
                console.log('Catch');
                if (
                    res instanceof TypeError &&
                    res.message.includes('Failed to fetch')
                ) {
                    setSnackbar({
                        Transition: SlideTransition,
                        open: true,
                    });
                }
            })
            .finally(() => {
                console.log('Finally');
                setIsFormSubmitting(false);
            });
    };

    // Snackbar
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        Transition: Fade,
    });

    const handleSnackbarClose = () => {
        setSnackbar({
            Transition: SlideTransition,
            open: false,
        });
    };

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="up" />;
    }

    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                height: '100%',
            }}
        >
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Something went wrong while processing your request. Please
                    check your connection and try again.
                </Alert>
            </Snackbar>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="div"
                        sx={{
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Vevous
                    </Typography>
                    <Button
                        style={{ marginLeft: 'auto' }}
                        onClick={() => navigate('/signup')}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Sign up
                    </Button>
                </Toolbar>
            </AppBar>
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
                        Sign in to Vevous
                    </Typography>
                    {isInvalid && (
                        <Alert
                            icon={<Info fontSize="inherit" />}
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            That doesn't look right. Check your email and
                            password and try again.
                        </Alert>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '100%' }}
                    >
                        {/* Email */}
                        <TextField
                            label="Email"
                            type="text"
                            sx={{ width: '100%' }}
                            {...register('email', {
                                required: 'Email is required', // Validation rule
                            })}
                            error={!!errors.email} // Show error styling when error exists
                            helperText={errors.email?.message?.toString()} // Display the error message
                        />
                        {/* Password */}
                        <TextField
                            label="Password"
                            type="password"
                            sx={{ mt: 2, width: '100%' }}
                            {...register('password', {
                                required: 'Password is required', // Validation rule
                            })}
                            error={!!errors.password} // Show error styling when error exists
                            helperText={errors.password?.message?.toString()} // Display the error message
                        />
                        <div style={{ marginTop: 16, float: 'right' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {isFormSubmitting ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </div>
                        {/* <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: 'center',
                                    marginTop: '5px',
                                }}
                            >
                                <span>
                                    <a
                                        style={{
                                            color: '#000',
                                            marginRight: '5px',
                                        }}
                                    >
                                        No account?
                                    </a>
                                    <Link href="/signup">Sign up</Link>
                                </span>
                            </Grid> */}
                    </form>
                </Card>
            </Container>
        </div>
    );
};

export default SignInPage;

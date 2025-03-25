import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    AppBar,
    Toolbar,
    CardContent,
    Card,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface ISignInForm {
    email: string;
    password: string;
}

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInForm>();

    const onSubmit = (data: ISignInForm) => {
        console.log(data);
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
                    <Typography sx={{ alignSelf: 'baseline' }} variant="h6">
                        Sign in to Vevous
                    </Typography>

                    <CardContent></CardContent>
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
                            type="text"
                            sx={{ mt: 2, width: '100%' }}
                            {...register('password', {
                                required: 'Password is required', // Validation rule
                            })}
                            // sx={{ mt: 2, width: '100%' }}
                            error={!!errors.password} // Show error styling when error exists
                            helperText={errors.password?.message?.toString()} // Display the error message
                        />
                        <div style={{ marginTop: 16, float: 'right' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ padding: '10px' }}
                            >
                                Sign in
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

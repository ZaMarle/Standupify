import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    Fade,
    Modal,
    Slide,
    SlideProps,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ApiClient from '../dataAccess/api';
import ICreateTeamForm from '../interfaces/ICreateTeamForm';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';

interface CreateTeamModalProps {
    open: boolean;
    handleClose: () => void;
}

function CreateTeamModal({ open, handleClose }: CreateTeamModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateTeamForm>();

    const onSubmit = (data: ICreateTeamForm) => {
        console.log(data);
        const apiClient = new ApiClient();
        apiClient.teams.create(data).then((res) => {
            console.log(res);

            if (res.kind == 'err') {
                setSnackbar({
                    open: true,
                    Transition: SlideTransition,
                });
            } else {
                handleClose();
            }
        });
    };

    // Snackbar
    const [snackbar, setSnackbar] = React.useState<{
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

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Something went wrong while processing your request. Please
                    check your connection and try again.
                </Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 2,
                        borderRadius: '8px',
                    }}
                >
                    <Typography sx={{ mb: 2 }} variant="h6">
                        Create new team
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '100%' }}
                    >
                        <TextField
                            label="Name"
                            type="text"
                            sx={{ width: '100%' }}
                            {...register('teamName', {
                                required: 'Name is required', // Validation rule
                            })}
                            error={!!errors.teamName} // Show error styling when error exists
                            helperText={errors.teamName?.message?.toString()} // Display the error message
                        />
                        <TextField
                            label="Description"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            sx={{ mt: 2, width: '100%' }}
                            {...register('description')}
                        />
                        <div style={{ marginTop: 16, float: 'right' }}>
                            <Button
                                sx={{ mr: 1 }}
                                variant="contained"
                                color="secondary"
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Card>
            </Modal>
        </>
    );
}

export default CreateTeamModal;

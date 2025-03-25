import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

interface IInviteToTeamModalProps {
    open: boolean;
    handleClose: () => void;
    teamName: string;
}

interface ICreateTeamForm {
    email: string;
}

function InviteToTeamModal({
    open,
    handleClose,
    teamName,
}: IInviteToTeamModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateTeamForm>();

    const onSubmit = (data: ICreateTeamForm) => {
        console.log(data);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: '8px',
                }}
            >
                <Typography sx={{ mb: 2 }} variant="h6">
                    Invite user to {teamName}
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: '100%' }}
                >
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
                            Invite
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default InviteToTeamModal;

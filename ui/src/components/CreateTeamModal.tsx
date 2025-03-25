import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

interface CreateTeamModalProps {
    open: boolean;
    handleClose: () => void;
}

interface ICreateTeamForm {
    teamName: string;
    description: string;
}

function CreateTeamModal({ open, handleClose }: CreateTeamModalProps) {
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
            </Box>
        </Modal>
    );
}

export default CreateTeamModal;

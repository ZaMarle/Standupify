import { Button, Card, Modal, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ApiClient from '../dataAccess/ApiClient';
import ICreateTeamForm from '../interfaces/ICreateTeamForm';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { SnackMessages, useSnack } from './SnackContext';
import Team from '../models/Team';

interface CreateTeamModalProps {
    open: boolean;
    handleClose: () => void;
    handleCreate: (team: Team) => void;
}

function CreateTeamModal({
    open,
    handleClose,
    handleCreate,
}: CreateTeamModalProps) {
    const authContext = useAuth();
    const snackContext = useSnack();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ICreateTeamForm>();

    const onSubmit = async (data: ICreateTeamForm) => {
        const apiClient = new ApiClient(authContext);
        const res = await apiClient.teams.create(data);
        if (!res.ok) {
            snackContext.send(SnackMessages.BadConnection);
        } else {
            console.log(res);
            const resJson = await res.json();
            console.log(resJson);
            const createdTeam: Team = resJson;
            console.log(createdTeam);
            handleCreate(createdTeam);
        }
    };

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open) {
            reset({
                description: '',
                teamName: '',
            });
        }
    }, [open, reset]);

    return (
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
    );
}

export default CreateTeamModal;

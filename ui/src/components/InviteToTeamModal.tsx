import {
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IInviteToTeamModalProps {
    open: boolean;
    handleClose: () => void;
    teamName: string;
}

interface ICreateTeamForm {
    email: string;
    role: string;
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
        reset,
    } = useForm<ICreateTeamForm>({ defaultValues: { role: 'user' } });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open) {
            reset({
                email: '',
                role: 'user',
            });
        }
    }, [open, reset]);

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
                            required: 'Email is required',
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message?.toString()}
                    />
                    <FormControl
                        sx={{ width: '100%', mt: 2 }}
                        error={!!errors.role}
                    >
                        <InputLabel>Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            {...register('role', {
                                required: 'Role is required',
                            })}
                            defaultValue="user"
                        >
                            <MenuItem key="user" value="user">
                                User
                            </MenuItem>
                            <MenuItem key="admin" value="admin">
                                Admin
                            </MenuItem>
                        </Select>
                    </FormControl>
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
            </Card>
        </Modal>
    );
}

export default InviteToTeamModal;

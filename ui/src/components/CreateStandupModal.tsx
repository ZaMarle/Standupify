import {
    Button,
    Card,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ICreateStandupForm from '../interfaces/ICreateStandupForm';
import { useEffect, useState } from 'react';
import ApiClient from '../dataAccess/api';
import Team from '../models/Team';
import { useAuth } from '../AuthContext';

interface CreateStandupModalProps {
    open: boolean;
    handleClose: () => void;
}

function CreateStandupModal({ open, handleClose }: CreateStandupModalProps) {
    const authContext = useAuth();

    const { control, register, handleSubmit, reset } =
        useForm<ICreateStandupForm>();

    const onSubmit = (data: ICreateStandupForm) => {
        console.log(data);
    };

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open) {
            reset({
                blockers: '',
                today: '',
                yesterday: '',
                teamIds: new Array<number>(),
            });
        }
    }, [open, reset]);

    // Fetch team for dropdown
    const [teams, setTeams] = useState<Array<Team>>([]);
    useEffect(() => {
        if (open) {
            console.log(authContext);
            const apiClient = new ApiClient(authContext);
            const userId = authContext.token?.userId;

            if (userId) {
                apiClient.users.getTeams(userId).then((res) => {
                    console.log('unwrapping res');
                    if (res.ok) {
                        console.log(res);

                        res.json().then((json) => {
                            console.log(json);
                        });

                        setTeams([
                            { id: 1, name: 'Software Development' },
                            { id: 2, name: 'Systems' },
                            { id: 3, name: 'Engineering' },
                        ]);
                    }
                });
            }
        }
    }, [open, authContext]);

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
                    Create new standup
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: '100%' }}
                >
                    <TextField
                        label="Yesterday"
                        {...register('yesterday', {})}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="What key progress did you make yesterday?"
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="Today"
                        {...register('today', {})}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="What’s your focus for today?"
                        sx={{ mt: 2, width: '100%' }}
                    />
                    <TextField
                        label="Blockers"
                        {...register('blockers', {})}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Any challenges or roadblocks in your way?"
                        sx={{ mt: 2, width: '100%' }}
                    />
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                            Teams
                        </InputLabel>
                        <Controller
                            name="teamIds"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={
                                        (selected) =>
                                            teams
                                                .filter((t) =>
                                                    selected.includes(t.id),
                                                )
                                                .map((t) => t.name)
                                                .join(', ')
                                        // selected.join(', ')
                                    }
                                >
                                    {teams.map((team) => (
                                        <MenuItem key={team.id} value={team.id}>
                                            <Checkbox
                                                checked={field.value.includes(
                                                    team.id,
                                                )}
                                            />
                                            <ListItemText primary={team.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
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
                            Post
                        </Button>
                    </div>
                </form>
            </Card>
        </Modal>
    );
}

export default CreateStandupModal;

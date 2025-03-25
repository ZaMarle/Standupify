import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ICreateStandupForm from '../interfaces/ICreateStandupForm';

interface PostModalProps {
    open: boolean;
    handleClose: () => void;
}

function PostModal({ open, handleClose }: PostModalProps) {
    const { register, handleSubmit } = useForm<ICreateStandupForm>();

    const onSubmit = (data: ICreateStandupForm) => {
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
            </Box>
        </Modal>
    );
}

export default PostModal;

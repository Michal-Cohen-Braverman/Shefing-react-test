import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';

const NewPostDialog = ({ open, onClose, onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const handleCreatePost = () => {
    // Add validation logic here if needed
    const newPost = {
      title,
      body,
      userId: parseInt(userId, 10), // Ensure userId is a number
    };

    // Call the callback function to handle post creation
    onCreatePost(newPost);

    // Clear the input fields
    setTitle('');
    setBody('');
    setUserId('');

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreatePost} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPostDialog;
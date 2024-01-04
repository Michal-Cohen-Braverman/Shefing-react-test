import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import useAxios from 'axios-hooks';

const UserPosts = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [{ data: posts }] = useAxios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  useEffect(() => {
    setOpen(false); // Close the dialog when userId changes
  }, [userId]);

  const handleCreatePost = () => {
    // Add your logic to create a new post (not implemented in this example)
    // You may use another dialog or a form component for creating posts
  };

  return (
    <div>
      <List>
        {posts &&
          posts.map((post) => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.body} />
            </ListItem>
          ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Post
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField label="Title" />
          <TextField label="Body" />
          <Button variant="contained" color="primary" onClick={handleCreatePost}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPosts;
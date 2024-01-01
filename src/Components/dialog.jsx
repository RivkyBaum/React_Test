/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewPost = ({ addNewPost }) => {
  let currentUser = useSelector((myStore) => {
    return myStore.currentUser
  })

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleCreatePost = () => {
    if (title === '' || body === '') {
      toast.error('Please enter data in both fields!', {
        position: toast.POSITION.TOP_CENTER

      });

      return;
    }
    else {
      toast.success('The post has been successfully added', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    const newPost = {
      title: title,
      body: body,
      userId: currentUser.id,
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        addNewPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    handleCloseDialog();
  };
  //Add post button with validation
  return <>
    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
      Create post
    </Button>
    <ToastContainer />
    <ToastContainer />
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Create new post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={body}
          onChange={handleBodyChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreatePost}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  </>
} 
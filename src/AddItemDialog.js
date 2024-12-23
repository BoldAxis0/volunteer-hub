import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export default function AddItemDialog({ open, onClose, onAdd }) {
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  const handleChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAdd = () => {
    onAdd(newItem);
    setNewItem({ name: '', description: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" name="title" label="Title" type="text" fullWidth value={newItem.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth value={newItem.description} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Item from './Item';
import AddItemDialog from './AddItemDialog';
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from './firebase'; 
// import { useAuth0 } from '@auth0/auth0-react';

const Category = ({ categoryTitle, items, fetchEvents, enableAddBtn }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // const [user] = useAuth0();

  const handleAdd = async (newItem) => {
    const eventsCollection = collection(db, 'events');
    await addDoc(eventsCollection, {
      name: newItem.title,
      description: newItem.description,
      category: categoryTitle,
      imageurl:"something"
      // organiser:  
    });

    fetchEvents();
    setIsDialogOpen(false);
  };

  const eventDelete = () => {
    // Implement your own event deletion logic here
    // For example, delete the event document from Firestore
    fetchEvents();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>{categoryTitle}</Typography>
         {enableAddBtn&&<Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          add item
        </Button>}
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around" m={2}>
        {items.map((item, index) => (
          <Box key={index} p={1}>
            <Item item={item} eventDelete={eventDelete} />
          </Box>
        ))}
      </Box>
      <AddItemDialog
        open={isDialogOpen}
        onClose={handleClose}
        onAdd={handleAdd}
      />
    </Box>
  );
}

export default Category;
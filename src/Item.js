import {React, useState} from "react";
import {
  Card,
  CardActionArea,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  Avatar,
  Menu,
  IconButton,
  MenuItem,
} from "@mui/material";
import { red } from '@mui/material/colors';
import { useAuth0 } from "@auth0/auth0-react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { doc, setDoc, getDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // import your Firestore instance


function Item({item, eventDelete, enableSignUp}) {

  const { user, isAuthenticated } = useAuth0();
  const [signedUp, setSignedUp] = useState(false);
  const userId = user?.sub;

  const handleSignUp = async () => {
    const usersCollection = collection(db, 'events', item.id, 'users');
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, { userId: userId });
    }

    // Add the event id to the 'events' collection under the current user's document
    const userEventsCollection = collection(db, 'users', userId, 'events');
    const eventDocRef = doc(userEventsCollection, item.id);
    const eventDocSnap = await getDoc(eventDocRef);

    if (!eventDocSnap.exists()) {
      await setDoc(eventDocRef, { eventId: item.id });
    }
      setSignedUp(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    console.log('Menu button clicked');
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const itemRef = doc(db,'events', item.id);
    await deleteDoc(itemRef);
    handleMenuClose();
    eventDelete();
  };


  return (
    <Box m={1}>
      <Card
        style={{ width: 300, maxWidth: 300, maxHeight: 300, overflow: "auto" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={item.name}
            height="140"
            image={item.imageurl}
            title={item.name}
             action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {isAuthenticated && !signedUp? (
          <Button size="small" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
          ):(
            <Typography>{isAuthenticated? "Signed up!":"Please log in to sign up"}</Typography>)
            } 

        <IconButton aria-label="settings" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDelete} style={{color:"red"}}>Delete</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Item;

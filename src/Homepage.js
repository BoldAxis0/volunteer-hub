import { Box } from "@mui/material";
import Item from "./Item"; // Import the 'Item' component
import Category from "./Category";
import { useAuth0 } from "@auth0/auth0-react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Container,
  } from "@mui/material";
  import { useState, useEffect } from "react"; // Import the 'useState' hook
  import { db } from './firebase'; // import your Firestore instance
  import { collection, getDoc, getDocs, query, orderBy, doc }  from 'firebase/firestore';

export default function Homepage(){

    const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'events');
    const eventsQuery = query(eventsCollection, orderBy('category'));
    const querySnapshot = await getDocs(eventsQuery);
    const fetchedEvents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const eventsByCategory = fetchedEvents.reduce((categories, event) => {
      const { category } = event;

      if (!categories[category]) {
        categories[category] = [];
      }

      categories[category].push(event);
      return categories;
    }, {});

    setEvents(eventsByCategory);
  };

  useEffect(() => {
    fetchEvents(); 
  }, []);

    return (
      <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        margin="20px"
      >
        <Typography width="100%" align="center" variant="h3">
          Welcome to my volunteer hubs heh
        </Typography>
        
  
        {Object.entries(events).map(([category, items], index) => (
        <Box mt={1} key={category}>
        <Category
          categoryTitle={category}
          items={items}
        fetchEvents={fetchEvents}
        enableAddBtn={true}  // Enable the 'add item' button for each category
        />
      </Box>
    ))}
       
      </Box>
    </Container>
  
    )
  }
  
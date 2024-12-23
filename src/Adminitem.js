
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Grid,
  IconButton,
  TextField,
  Box,
  CardMedia
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
export default function Adminitem() {

  //need to add buttons to delete or edit user 

  //this creates that arrow button which when clicked expands the item and 
  //flips 180 degrees 
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const FormCard = ({ serialNumber }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>

          {/* //this grid controls the entire item before it is expanded */}
          <Grid container spacing={2} alignItems="center">

            {/* //this item is the serial number */}
            <Grid item xs={1}>
              <Typography variant="body1">{serialNumber}</Typography>
            </Grid>
          {/* //this grid item shows the pct which idk what it is yet */}
            
            <Grid item xs={2}>
              <TextField fullWidth label="Pct" variant="outlined" size="small" />
            </Grid>
          {/* //this grid item shows the title */}
          <Grid item xs={3}>
              <TextField fullWidth label="Title" variant="outlined" size="small" />
            </Grid>
          {/* //this grid shows the organiser req which idk what that is */}
          <Grid item xs={3}>
              <TextField fullWidth label="Organizer Req." variant="outlined" size="small" />
            </Grid>
          {/* //this grid item shows the value which is also a junk field right now */}
          <Grid item xs={2}>
              <TextField fullWidth label="Value" variant="outlined" size="small" />
            </Grid>
          {/* //this is the button which shows allows you to expand the item */}
          <Grid item xs={1}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Grid>
          </Grid>
        </CardContent>
        
        {/* //this collapse component controls the animation hiding/showing the other items */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2}>

          {/* //this is the description box for some reason */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Descrizione"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

          {/* //this is the image box. will need to resize this */}
              <Grid item xs={12} sm={6}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/300"
                  alt="Placeholder image"
                />
              </Grid>

          {/* //this is the date box  */}              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

          {/* //this is the numero altuno box for some reason */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Numero Atlunato"
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  //this is unused. idk what this is doing
  // // In FormUI.js
  // const FormUI = ({ title, initialData }) => {
  //   return (
  //     <Box sx={{ p: 3 }}>
  //       <Typography variant="h5" gutterBottom>{title}</Typography>
  //       {initialData.map((item, index) => (
  //         <FormCard key={index} serialNumber={index + 1} data={item} />
  //       ))}
  //     </Box>
  //   );
  // };

  //i think this bad boy assembles all the items. WHich is wrong because the current
  //function should only be sending back one individual item, not the whole thing.
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Form Title</Typography>
      {[1, 2, 3, 4].map((num) => (
        <FormCard key={num} serialNumber={num} />
      ))}
    </Box>
  );

}



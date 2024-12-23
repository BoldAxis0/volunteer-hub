
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
export default function Adminitem(){
    

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <Typography variant="body1">{serialNumber}</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Pct" variant="outlined" size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Title" variant="outlined" size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Organizer Req." variant="outlined" size="small" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Value" variant="outlined" size="small" />
          </Grid>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descrizione"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Placeholder image"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
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

// In FormUI.js
const FormUI = ({ title, initialData }) => {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {initialData.map((item, index) => (
          <FormCard key={index} serialNumber={index + 1} data={item} />
        ))}
      </Box>
    );
  };

    return (
        <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Form Title</Typography>
        {[1, 2, 3].map((num) => (
            <FormCard key={num} serialNumber={num} />
        ))}
        </Box>
    );
    
}



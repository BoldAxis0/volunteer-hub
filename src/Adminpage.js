import {Container} from "@mui/material"
import Homepage from "./Homepage"; // Import the 'Homepage' component
import Adminitem from "./Adminitem";


//basically i want to see organiser and attendees for each event
// TODO: this component is pending 

export default function Adminpage(){



    // return (
    //     <Container>

    //        <Adminitem />

    //     </Container>
    // )

    const formData = [
        { pct: '10%', title: 'Event 1', organizer: 'John Doe', value: '1000' },
        { pct: '20%', title: 'Event 2', organizer: 'Jane Smith', value: '2000' },
        { pct: '30%', title: 'Event 3', organizer: 'Bob Johnson', value: '3000' },
      ];
    
      return (
        
        <div className="App">
          <Adminitem title="Event Management" initialData={formData} />
        </div>
      );
}
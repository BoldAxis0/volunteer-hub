import {Container} from "@mui/material"
import Category from "./Category"
import { useEffect, useState } from "react";
import { db } from './firebase'; // import your Firestore instance
import { collection, getDocs, getDoc, query, orderBy, doc }  from 'firebase/firestore';
import { useAuth0 } from "@auth0/auth0-react";

export default function Userpage(){

    const {user, isAuthenticated} = useAuth0();
    const [userItems, setUserItems] = useState([]);

    const fetchEvents = async () => {
        console.log('Fetching events');
        if (isAuthenticated) {
            try {
                const userDocRef = doc(db, 'users', user.sub);
                const eventsCollectionRef = collection(userDocRef, 'events');
                const eventsSnapshot = await getDocs(eventsCollectionRef);
                
                const eventIds = eventsSnapshot.docs.map(doc => doc.id);
                console.log(eventIds);
                const events = [];
            
                for (const id of eventIds) {
                    const eventDocRef = doc(db, 'events', id);
                    const eventDocSnap = await getDoc(eventDocRef);
            
                    if (eventDocSnap.exists()) {
                        events.push(eventDocSnap.data());
                    } else {
                        console.log(`No such document for event id: ${id}`);
                    }
                }

                console.log(events);
                setUserItems(events);

            } catch (error) {
                console.error("Error fetching events:", error);
            }
            
        } else {
            console.log("No user is signed in");
        }
    };

    useEffect(() => {
        //this works
        console.log(isAuthenticated?user.sub:"not signed in");

        fetchEvents();
    }, [isAuthenticated]);



    return (
        <Container>
            <Category categoryTitle="Your attending events" 
            items={userItems} fetchEvents={fetchEvents}
            enableAddBtn={false}/>
            
             {/* <h1>hello</h1> */}
        </Container>
    )

}
import React from "react";
import EventCard from "../components/Events/EventCard";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const {allEvents}=useSelector((state)=>state.event);
  return (
    <div>
    <Header/>
      <div className={`${styles.section} my-12 mt-[100px]`}>
      {allEvents && allEvents.length === 0 ? (
          <div>Currently there is no event!</div>
        ) : (
          <div className="w-full grid">
            {
              allEvents && allEvents.map((event, index)=>(
                <EventCard key={index} event={event}/>
        ))
            }
          </div>
        )}
      </div>
    <Footer/>
    </div>
  );
};

export default EventsPage;

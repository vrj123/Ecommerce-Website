import React from "react";
import EventCard from "../components/Events/EventCard";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  return (
    <div>
    <Header/>
      <div className={`${styles.section} my-12`}>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default EventsPage;

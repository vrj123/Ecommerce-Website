import React from 'react'
import styles from '../../styles/styles';
import EventCard from './EventCard';

const Events = () => {
  return (
    <div className={`${styles.section} mb-12`}>
        <div className={`${styles.heading}`}>
            <h1>Pouplar Event</h1>
        </div>
        <div className="w-full grid">
            <EventCard/>
        </div>
    </div>
  )
}

export default Events;
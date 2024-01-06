import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import EventCard from './EventCard';

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  console.log(allEvents);

  return (
    <div className={`${styles.section} mb-12`}>
        <div className={`${styles.heading}`}>
            <h1>Pouplar Event</h1>
        </div>
        {isLoading ? (
        <div>Loading...</div>
      ) : allEvents ? (
          <div className="w-full grid">
            <EventCard event={allEvents && allEvents[0]} />
          </div>
      ) : (
        <div className="font-[600] text-[18px] p-4 text-center">
          No event found!
        </div>
      )}
    </div>
  )
}

export default Events;
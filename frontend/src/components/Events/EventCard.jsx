import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const EventCard = () => {
  return (
    <div className="w-full bg-white block rounded-lg p-2 lg:flex">
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone14 pro max</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          repellendus odit, pariatur reiciendis tempora nisi placeat harum in
          mollitia delectus molestiae ab cumque expedita perspiciatis eligendi
          temporibus at consectetur nulla. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sint repellendus odit, pariatur
          reiciendis tempora nisi placeat harum in mollitia delectus molestiae
          ab cumque expedita perspiciatis eligendi temporibus at consectetur
          nulla.
        </p>
        <div className="py-2 flex justify-between">
          <div className="flex">
            <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>1099$</h5>
            <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>999$</h5>
          </div>
          <p className="text-[green]">120 sold</p>
        </div>
        <div>
            <CountDown/>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

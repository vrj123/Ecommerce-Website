import React from 'react';
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex} mt-[80px] 800px:mt-0`}
    style={{
        backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
    }}
    >
    <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className='text-[35px] 800px:text-[60px] capitalize font-[600] leading-[1.2] text-[#3d3a3a]'>
            Best Collections for <br /> Home Decoration
        </h1>
        <p className='pt-5 font-[Poppins] font-[400] text-[16px]'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to='/products' className='inline-block'>
            <div className={`${styles.button} text-white font-[Poppins] text-[20px] mt-5`}>
                Shop Now
            </div>
        </Link>
    </div>

    </div>
  )
}

export default Hero;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';

const ProductDetail = ({data}) => {

    const [count, setCount]=useState(1);
    const [click, setClick]=useState(false);
    const navigate=useNavigate();

  return (
     
    <div className='bg-white'>
    {
        data?
        (
           <div className={`${styles.section} w-[90%] 800px:w-[80%] h-screen`}>
                <div className='w-full py-5'>
                    <div className='w-full 800px:flex block'>
                        <div className='w-full 800px:w-[50%]'>
                          Hello
                        </div>

                    </div>

                </div>
           </div> 
        ):null
    }

    </div>
  )
}

export default ProductDetail;
import React from 'react';
import { brandingData } from '../../../static/data';
import styles from '../../../styles/styles';
import { categoriesData } from '../../../static/data';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate=useNavigate();
  return (
      <>
        <div className={`${styles.section} hidden sm:block`}>
        <div className={`branding my-12 flex justify-between items-ceneter w-full shadow-sm bg-white p-5 rounded-sm`}>
            {
                brandingData && brandingData.map((i, index)=>{
                    return(
                        <div key={index} className='flex items-center'>
                            {i.icon}
                            <div className='px-3'>
                                <h3 className='font-bold text-sm md:text-base'>{i.title}</h3>
                                <p className='text-xs md:text-sm'>{i.Description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>


        </div>

        <div className={`${styles.section} bg-white rounded-lg mb-12 p-6`}>
            <div className='grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]'>
            {
                categoriesData && categoriesData.map((i, index)=>{
                    const handleSubmit=(i)=>{
                        navigate(`/products?categories=${i.title}`)
                    }
                    return(
                        <div key={index} className='flex items-center justify-between cursor-pointer overflow-hidden h-[100px]' onClick={()=>handleSubmit(i)}>
                            <h5 className='text-[18px leading-[1.3]'>{i.title}</h5>
                            <img src={i.image_Url} alt="" className='object-cover w-[120px]'/>
                        </div>
                    )
                })
            }
            </div>
        </div>
      </>
  )
}

export default Categories;
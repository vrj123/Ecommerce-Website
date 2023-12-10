import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {

  const navigate=useNavigate();
  const handleSubmit=(i)=>{

    const category=i.title.replace(/\s+/g, "-");
    navigate(`/products?category=${category}`);
    setDropDown(false);
    window.location.reload(true);
  }



  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => {
          return (
            <div key={index} className={`${styles.noramlFlex}`} onClick={()=>handleSubmit(i)}>
              <img
                src={i.image_Url}
                alt=""
                style={{
                  height: "25px",
                  width: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default DropDown;

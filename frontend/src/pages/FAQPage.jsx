import React, { useState } from "react";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Faqs } from "../static/data";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (number) => {
    if (activeTab === number) setActiveTab(null);
    else setActiveTab(number);
  };
  return (
    <div>
      <Header />
      <div className={`${styles.section} mt-[100px] 800px:mt-[20px]`}>
        <h1 className={`${styles.heading} mt-[30px]`}>FAQ's</h1>
        <div>
          {Faqs.map((faq, index) => {
            return (
              <div
                className='w-full shadow-md my-[30px] px-2 sm:px-8 h-fit
                py-[10px] cursor-pointer'
                key={index}
                onClick={() => toggleTab(index)}
              >
                <div className="flex justify-between text-[20px]">
                  {faq.que}
                  {activeTab === index ? (
                    <RxCross1 size={20} />
                  ) : (
                    <IoIosArrowForward size={20} />
                  )}
                  {}
                </div>
                {activeTab === index ? (
                  <p className="text-gray-500 mt-[10px]">{faq.ans}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;

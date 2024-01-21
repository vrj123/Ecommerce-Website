import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import { local_server } from "../../server";
import { useNavigate } from "react-router-dom";


const SellerInbox = ({
    setOpen,
    newMessage,
    setNewMessage,
    sendMessageHandler,
    messages,
    sellerId,
    userData,
    activeStatus,
    scrollRef,
    handleImageUpload
  }) => {

    const navigate=useNavigate();
  
    return (
      <div className="w-[full] min-h-full flex flex-col justify-between p-5">
        {/* message header */}
        <div className="w-full flex p-3 items-center justify-between bg-slate-200">
          <div className="flex">
            <img
              src={`${local_server}${userData?.avatar}`}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
              <h1>{activeStatus ? "Active Now" : ""}</h1>
            </div>
          </div>
          <AiOutlineArrowRight
            size={20}
            className="cursor-pointer"
            onClick={() => setOpen(false) || navigate('/inbox')}
          />
        </div>
  
        {/* messages */}
        <div className="px-3 h-[59vh] py-3 overflow-y-scroll">
          {messages &&
            messages.map((item, index) => (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
                key={index}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${local_server}${userData?.avatar}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                <div>
                  <div
                    className={`w-max p-2 rounded ${
                      item.text!=="" ? item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]" : "border"
                    } text-[#fff] h-min`}
                  >
                   {
                      item.text===""?(
                        <img src={`${local_server}${item.images}`} alt="" className="h-[150px] w-[150px]"/>
                      ):(
                        <p>{item.text}</p>
                      )
                      
                    }
                  </div>
  
                  <p className="text-[12px] text-[#000000d3] pt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
  
        {/* send message input */}
        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px]">
          <input type="file" className="hidden" id='msg_img' onChange={handleImageUpload}/>
            <label htmlFor="msg_img">
            <TfiGallery className="cursor-pointer" size={20} />
            </label>
          </div>
          <div className="w-full">
            <input
              type="text"
              required
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={20}
                className="absolute right-4 top-5 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    );
  };

  export default SellerInbox;
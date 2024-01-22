import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SellerInbox from './SellerInbox';
import { local_server, server } from "../../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = "https://ecommerce-website-1dsx.vercel.app/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [images, setImages]=useState(null);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  const handleImageUpload=(e)=>{
    const file=e.target.files[0];
    setImages(file);
    imageSendingHandler(file);
}

const imageSendingHandler=(image)=>{
  const message={
    sender:user._id,
    text:newMessage,
    images:image,
    conversationId:currentChat._id,
  };

  const newForm=new FormData();
  newForm.append("sender", user._id);
  newForm.append("text", newMessage);
  newForm.append("file", image);
  newForm.append("conversationId", currentChat._id);


  const receiverId=currentChat.members.find((member)=>member!=user._id);

  socketId.emit('sendMessage', {
    senderId:user._id,
    receiverId,
    images:image
  })
  try{
    const config = { header: { "Content-Type": "multipart/form-data" } };
    axios.post(`${server}/message/create-new-message`, newForm, config).then((res)=>{
      setImages(null);
      setMessages([...messages, message]);
      updateLastMessageForImage();
    })
  }
  catch(error){
    console.log(error);
  }
}

const updateLastMessageForImage=()=>{
  axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {lastMessage:'Photo', lastMessageId:user._id})
}

  return (
    <div className="w-full">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox/${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);

        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${local_server}${user?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== user?._id
            ? "You:"
            : user?.name?.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

// const SellerInbox = ({
//   setOpen,
//   newMessage,
//   setNewMessage,
//   sendMessageHandler,
//   messages,
//   sellerId,
//   userData,
//   activeStatus,
//   scrollRef,
//   handleImageUpload
// }) => {

//   console.log(messages);
//   return (
//     <div className="w-[full] min-h-full flex flex-col justify-between p-5">
//       {/* message header */}
//       <div className="w-full flex p-3 items-center justify-between bg-slate-200">
//         <div className="flex">
//           <img
//             src={`${local_server}${userData?.avatar}`}
//             alt=""
//             className="w-[60px] h-[60px] rounded-full"
//           />
//           <div className="pl-3">
//             <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
//             <h1>{activeStatus ? "Active Now" : ""}</h1>
//           </div>
//         </div>
//         <AiOutlineArrowRight
//           size={20}
//           className="cursor-pointer"
//           onClick={() => setOpen(false)}
//         />
//       </div>

//       {/* messages */}
//       <div className="px-3 h-[59vh] py-3 overflow-y-scroll">
//         {messages &&
//           messages.map((item, index) => (
//             <div
//               className={`flex w-full my-2 ${
//                 item.sender === sellerId ? "justify-end" : "justify-start"
//               }`}
//               ref={scrollRef}
//               key={index}
//             >
//               {item.sender !== sellerId && (
//                 <img
//                   src={`${local_server}${userData?.avatar}`}
//                   className="w-[40px] h-[40px] rounded-full mr-3"
//                   alt=""
//                 />
//               )}
//               <div>
//                 <div
//                   className={`w-max p-2 rounded ${
//                     item.text!=="" ? item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]" : "border"
//                   } text-[#fff] h-min`}
//                 >
//                  {
//                     item.text===""?(
//                       <img src={`${local_server}${item.images}`} alt="" className="h-[150px] w-[150px]"/>
//                     ):(
//                       <p>{item.text}</p>
//                     )
                    
//                   }
//                 </div>

//                 <p className="text-[12px] text-[#000000d3] pt-1">
//                   {format(item.createdAt)}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* send message input */}
//       <form
//         aria-required={true}
//         className="p-3 relative w-full flex justify-between items-center"
//         onSubmit={sendMessageHandler}
//       >
//         <div className="w-[30px]">
//         <input type="file" className="hidden" id='msg_img' onChange={handleImageUpload}/>
//           <label htmlFor="msg_img">
//           <TfiGallery className="cursor-pointer" size={20} />
//           </label>
//         </div>
//         <div className="w-full">
//           <input
//             type="text"
//             required
//             placeholder="Enter your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className={`${styles.input}`}
//           />
//           <input type="submit" value="Send" className="hidden" id="send" />
//           <label htmlFor="send">
//             <AiOutlineSend
//               size={20}
//               className="absolute right-4 top-5 cursor-pointer"
//             />
//           </label>
//         </div>
//       </form>
//     </div>
//   );
// };

export default UserInbox;
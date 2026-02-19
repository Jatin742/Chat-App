import { useAppStore } from '@/store';
import React, { useEffect } from 'react';
import moment from 'moment';
import { IMessage } from '@/context/SocketContext';

const MessageContainer = () => {
  const { selectedChatData, selectedChatType, userInfo, selectedChatMessages } = useAppStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages])


  const renderMessages = () => {
    let lastDate: any = null;

    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {
            showDate && (
              <div className='text-center text-gray-500 my-2'>
                {moment(message.timeStamp).format("MMMM Do YYYY")}
              </div>
            )
          }
          {
            selectedChatType === "contact" && renderDMMessages(message)
          }
        </div>
      );
    }
    );
  }
  const getSenderId = (message: IMessage) => {
  return typeof message.sender === "string"
    ? message.sender
    : message.sender._id;
};
  const renderDMMessages = (message: IMessage) => {
    // console.log(message.sender, userInfo?._id);
    const senderId = getSenderId(message);
  const isMyMessage = senderId === userInfo?._id;
    return <div className={`${isMyMessage ? "text-right" : "text-left"} `}>
      {message.messageType === "text" && <div className={`${isMyMessage ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] wrap-word-break`}>
      {message.content}
    </div>}
    <div className='text-xs text-gray-600'>
      {moment(message.timeStamp).format("h:mm A")}
    </div>
    </div>
  }
  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  )
}

export default MessageContainer
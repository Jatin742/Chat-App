import { useAppStore } from '@/store';
import React, { useEffect } from 'react';
import moment from 'moment';
import { apiClient } from '@/app/lib/api-client';
import { GET_ALL_MESSAGES_ROUTE, HOST } from '@/app/lib/utils/constants';
import { ContactType } from '@/enum/ContactType';
import { MessageEnum } from '@/enum/MessageEnum';
import { IMessage } from '@/interface/IMessage';
import { MessageType } from '@/types/MessageType';
import { MdFolderZip } from 'react-icons/md';
import { IoMdArrowRoundDown } from 'react-icons/io';

const MessageContainer = () => {
  const { selectedChatData, selectedChatType, userInfo, selectedChatMessages, setSelectedChatMessages } = useAppStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.get(GET_ALL_MESSAGES_ROUTE + `/${selectedChatData?._id}`, { withCredentials: true });
        if (response.data) {
          setSelectedChatMessages(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    if (selectedChatData?._id) {
      if (selectedChatType === ContactType.USER) {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);


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
            selectedChatType === ContactType.USER && renderDMMessages(message)
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
  const checkIfImage = (filePath: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  }
  const downloadFile = async (url: string) => {
    const response = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop() as string);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  }
  const renderDMMessages = (message: MessageType) => {
    // console.log(message.sender, userInfo?._id);
    const senderId = getSenderId(message);
    const isMyMessage = senderId === userInfo?._id;
    return <div className={`${isMyMessage ? "text-right" : "text-left"} `}>
      {message.messageType === MessageEnum.TEXT && <div className={`${isMyMessage ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] wrap-word-break`}>
        {message.content}
      </div>}
      {message.messageType === MessageEnum.FILE && 
      <div className={`${isMyMessage ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] wrap-word-break`}>
        {checkIfImage(message.fileUrl)?
        <img
        src={`${HOST}/${message.fileUrl}`}
        alt="sent-image"
        className="max-w-full h-auto rounded cursor-pointer"
      />
        :
        
        <div className="flex items-center justify-center gap-4">
          <span className='text-white/8 text-3xl bg-black/20 rounded-full p-3'>
            <MdFolderZip />
          </span>
          <span>
            {message.fileUrl.split('/').pop()}
          </span>
          <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
            onClick={()=>downloadFile(message.fileUrl)}
          >
            <IoMdArrowRoundDown />
          </span>
        </div>
      }
      </div>
      }
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
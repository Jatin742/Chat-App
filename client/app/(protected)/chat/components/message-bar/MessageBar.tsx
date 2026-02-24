import React, { use, useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAppStore } from '@/store';
import { useSocket } from '@/context/SocketContext';
import { ContactType } from '@/enum/ContactType';
import { apiClient } from '@/app/lib/api-client';
import { UPLOAD_FILE_ROUTE } from '@/app/lib/utils/constants';
import { MessageEnum } from '@/enum/MessageEnum';

const MessageBar = () => {
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const socket = useSocket()
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInfo === undefined || message.trim() === "" || selectedChatData === undefined || selectedChatType === undefined) {
      return;
    }
    if (selectedChatType === ContactType.USER) {
      socket?.emit("sendMessage", {
        sender: userInfo._id,
        recipient: selectedChatData?._id,
        content: message,
        messageType: MessageEnum.TEXT,
        fileUrl: undefined
      });
    }
    setMessage("");
  }
  const handleAddEmoji = (emoji: { emoji: string }) => {
    setMessage((msg) => msg + emoji.emoji);
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [emojiRef]);
  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleAttachmentChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if(!userInfo){
        return;
      }
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true
        });
        if (response.status === 200 && response.data) {
          if(selectedChatType === ContactType.USER){
            socket?.emit("sendMessage", {
              sender: userInfo._id,
              recipient: selectedChatData?._id,
              content: undefined,
              messageType: MessageEnum.FILE,
              fileUrl: response.data.filePath,
            });
          }
          else{

          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className='h-[10vh] bg-[#1c1d25] flex items-center justify-center px-8 mb-6 gap-6' onSubmit={handleSendMessage}
    >
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input type="text" className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none '
          placeholder='Enter Message'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
          onClick={handleAttachmentClick}
        >
          <GrAttachment className='text-2xl' />
        </button>
        <input type="file" className='hidden' ref={fileInputRef} onChange={handleAttachmentChange} />
        <div className="relative ">
          <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerLine className='text-2xl' />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme={Theme.DARK}
              open={emojiPickerOpen}
              autoFocusSearch={false}
              onEmojiClick={handleAddEmoji}
            />
          </div>
        </div>
      </div>
      <button
        type='button'
        className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all' >
        <IoSend className='text-2xl' />
      </button>
    </form>
  );
}

export default MessageBar
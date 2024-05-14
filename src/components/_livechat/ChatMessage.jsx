import React from 'react'
import { PiUserCircleLight } from "react-icons/pi";
const ChatMessage = ({name, message}) => {
  return (
    <div className='w-full m-1 py-2 flex items-center shadow-sm my-3'>
      <PiUserCircleLight className='text-2xl text-green-500 ml-2 mr-1'/>
       <span className='text-[12.5px] font-bold capitalize'>{name}:</span>
       <span className='text-[12.5px] tracking-wide lowercase ml-2'>{message}</span>
    </div>
  )
}

export default ChatMessage
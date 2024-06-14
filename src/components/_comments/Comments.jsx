import React from 'react'
import { PiUserCircleLight } from "react-icons/pi";

const Comments = ({data}) => {
  const {name, comments} = data
  // console.log(data)

  return (
    <section className='flex flex-row items-start px-2 py-2  w-[65%] rounded mb-1'>
      <PiUserCircleLight className=' mr-2 text-2xl text-gray-600'/>
      <div>
        <p className='text-[13px] font-bold'>{name}</p>
        <p className='text-[13px] tracking-wide'>{comments}</p>
      </div>
    </section>
  )
}

export default Comments
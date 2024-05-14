import React from 'react'
import { PiHouseFill,  PiGooglePlayLogoThin, PiStackFill, PiUsbLight, PiUserFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

export const SideBar = () => {

  return (
    <section className='grid justify-center list-none'>
        <div>
            <Link to="/">
            <li>Home</li>
            </Link>
            <li>Shorts</li>
            <li>Videos</li>
            <li>Live</li>
        </div>
        <div>
            <h1 className='text-md font-bold'>Subscription</h1>
            <li>Music</li>
            <li>Sports</li>
            <li>Gaming</li>
            <li>Movies</li>
        </div>
        <div>
        <h1 className='text-md font-bold'>Watch Later</h1>
            <li>Music</li>
            <li>Sports</li>
            <li>Gaming</li>
            <li>Movies</li>
        </div>
    </section>
  )
}

export const SideBarIcons = () => {
    return (
        <section className='w-[6rem] h-screen shadow-md  items-center px-2'> 
            <div className='grid justify-items-center py-[.5rem]'>
                <PiHouseFill/>
                <p className='text-[.8rem]'>Home</p>
            </div>
            <div className='grid justify-items-center py-[.5rem]'>
                <PiGooglePlayLogoThin/>
                <p className='text-[.8rem]'>Shorts</p>
            </div>
            <div className='grid justify-items-center py-[.5rem]'>
                <PiUsbLight/>
                <p className='text-[.8rem]'>Subscription</p>
            </div>
            <div className='grid justify-items-center py-[.5rem]'>
                <PiUserFill/>
                <p className='text-[.8rem]'>you</p>
            </div>

        </section>
    )
}

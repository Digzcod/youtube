import React from 'react'


const VideoCard = ({info}) => {

  const {snippet, statistics} = info
  const {channelTitle, thumbnails, title} = snippet

  // console.log(title)
  return (
    <div className='w-[20rem]'>
      <img src={thumbnails?.medium?.url} alt="thumnail"  className='rounded-md'/>
      <ul className='w-auto p-2'>
        <li className='text-lg font-semibold w-auto'>{title}</li>
        <li className='text-sm'>{channelTitle}</li>
        <li className='text-sm'>{statistics?.viewCount}</li>
      </ul>
    </div>
  )
}

export const ForAdsVideo = ({data}) => {
  return (
    <section className='border border-slate-500 px-3 py-3'>
      <VideoCard info={data}/>
    </section>
  )
}

export default VideoCard
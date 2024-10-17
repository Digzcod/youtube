// VideoResult.js
import React, { useState } from "react";
import useResultQuery from "../hooks/useResultQuery";
import { Link } from "react-router-dom";

const VideoResult = () => {
  const { result } = useResultQuery();
  const [hoveredVideo, setHoveredVideo] = useState(null); // To track the hovered video

  const handleMouseEnter = (videoId) => {
    setHoveredVideo(videoId);
  };

  const handleMouseLeave = () => {
    setHoveredVideo(null);
  };

  if(result === undefined) {
    return <h1 className="text-center mt-[10rem] font-medium">You reached the api call limit from yt</h1>
  }

  return (
    <div className="w-full grid justify-center space-y-5">
      {result.map((item) => (
        <Link>
        <section className="flex gap-5" key={item?.id?.videoId}>
          <div className="w-[450px] h-[250px] rounded-md">
            {hoveredVideo === item?.id?.videoId ? (
              // Show iframe when hovering
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${item?.id?.videoId}?autoplay=1`}
                title={item?.snippet?.title}
                onMouseLeave={()=> setHoveredVideo(null)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            ) : (
                // Show thumbnail when not hovering
                <img
                src={item?.snippet?.thumbnails?.medium?.url}
                alt="thumbnail"
                className="w-full h-full object-cover"
                onMouseEnter={() => handleMouseEnter(item?.id?.videoId)}
                onMouseLeave={handleMouseLeave}
                />
            )}
          </div>
          <ul className="w-auto p-2">
            <li className="text-lg font-semibold w-auto">
              {item?.snippet?.title}
            </li>
            {/* <li>{item?.snippet?.channelTitle}</li> */}
            {/* <li>{item?.statistics?.viewCount} views</li> */}
          </ul>
        </section>
      </Link>
      ))}
    </div>
  );
};

export default VideoResult;

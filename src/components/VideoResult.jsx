// VideoResult.js
import React, { useState } from "react";
import useResultQuery from "../hooks/useResultQuery";

const VideoResult = () => {
  const { result, Link, hoveredVideo, setHoveredVideo, handleMouseEnter, handleMouseLeave } = useResultQuery();

  if (result === undefined) {
    return (
      <h1 className="text-center mt-[10rem] font-medium">
        You reached the api call limit from yt
      </h1>
    );
  }

  return (
    <div className="w-full grid justify-center space-y-5">
      {result.map((item) => (
        <Link to={"/watch?v="+ item?.id?.videoId}>
          <section className="flex w-[70vw] gap-5" key={item?.id?.videoId}>
            <div className="w-[450px] h-[250px] rounded-md">
              {hoveredVideo === item?.id?.videoId ? (
                // Show iframe when hovering
                <iframe
                  // width="100%"
                  // height="100%"
                  className="rounded-md w-[450px] h-[250px]"
                  src={`https://www.youtube.com/embed/${item?.id?.videoId}?autoplay=1`}
                  title={item?.snippet?.title}
                  onMouseLeave={() => setHoveredVideo(null)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Show thumbnail when not hovering
                <img
                  src={item?.snippet?.thumbnails?.medium?.url}
                  alt="thumbnail"
                  className="w-[450px] h-[250px] object-cover rounded-md"
                  onMouseEnter={() => handleMouseEnter(item?.id?.videoId)}
                  onMouseLeave={handleMouseLeave}
                />
              )}
            </div>
            <ul className="w-[vw50] pt-2">
              <li className="text-lg font-semibold w-auto">
                {item?.snippet?.title}
              </li>
              <li className="text-sm mt-[.2rem]">{item?.snippet?.channelTitle}</li>
            </ul>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default VideoResult;

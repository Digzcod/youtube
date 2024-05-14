import React, { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import VideoCard, { ForAdsVideo } from "./VideoCard";
import { Link } from "react-router-dom";
const VideosContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(YOUTUBE_API_URL);
    const json = await data.json();
    setLoading(false);
    setVideos(json?.items);
    // console.log(json?.items)
  }

  if (loading)
    return <h1 className="text-center mt-[20rem]">Hello Shimmer UI</h1>;
  // console.log(videos[0])

  return (
    <section className="py-[1.5rem] px-[5px] flex flex-wrap gap-[2rem]">
      <ForAdsVideo data={videos[1]}/>
      {videos.map((vidData) => (
        <Link key={vidData?.id} to={"watch?v="+vidData?.id}>
        <VideoCard key={vidData?.id} info={vidData} />
        </Link>
      ))}
    </section>
  );
};

export default VideosContainer;

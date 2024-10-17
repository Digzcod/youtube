import React, { useEffect, useState } from "react";
import VideoCard, { ForAdsVideo } from "./VideoCard";
import { Link } from "react-router-dom";
const VideosContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const ytData =
    process.env.REACT_APP_YT_API_URL + process.env.REACT_APP_GOOGLE_API_KEY;
  // console.log(ytData)
  console.log(process.env.REACT_APP_YT_AUTOCOMPLETE_SEARCH_QUERY_API);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(ytData);
    const json = await data.json();
    setLoading(false);
    setVideos(json?.items);
    // console.log(json?.items)
  }

  if (loading)
    return <h1 className="text-center mt-[20rem]">Hello Shimmer UI</h1>;

  if (videos === undefined)
    return (
      <h1 className="text-center mt-[20rem] font-semibold">
        if you are seeing this message. It means the items or videos are not visible becuz the api from YT I reached the limit
      </h1>
    );
  // console.log(videos[0])

  return (
    <section className="py-[1.5rem] px-[5px] flex flex-wrap gap-[2rem]">
      <ForAdsVideo data={videos[1]} />
      {videos.map((vidData) => (
        <Link key={vidData?.id} to={"watch?v=" + vidData?.id}>
          <VideoCard key={vidData?.id} info={vidData} />
        </Link>
      ))}
    </section>
  );
};

export default VideosContainer;

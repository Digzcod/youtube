import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const useResultQuery = () => {
  const [result, setResult] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null); // To track the hovered video
  const [searchParams] = useSearchParams();
  const query = searchParams.get("videos");
  // console.log(query);
  //  query.length("ve")

  const handleMouseEnter = (videoId) => {
    setHoveredVideo(videoId);
  };

  const handleMouseLeave = () => {
    setHoveredVideo(null);
  };


  useEffect(() => {
    getData()
  }, [query]);

  const getData = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${query}&type=video&maxResults=20`
    );
   const data = await response.json()
  //  console.log(data?.items) 
   setResult(data?.items)
};

  return {result, hoveredVideo, Link, handleMouseEnter, handleMouseLeave ,setHoveredVideo};
};
export default useResultQuery;

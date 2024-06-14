import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../redux/features/appMenuSlice";
import { useParams, useSearchParams } from "react-router-dom";
import CommentsContainer from "../components/_comments/CommentsContainer";
import LiveChat from "./_livechat/LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
    window.scrollTo(0, 0);
  }, []);


  return (
    <section className="flex flex-col w-full">
      <div className="flex px-6  mt-4">
        <iframe
        className="rounded-xl"
          width="1050"
          height="600"
          src={"https://www.youtube.com/embed/" + searchParams.get("v") + "?&autoplay=1"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder="0"
          allowFullScreen={true}
        />
        <LiveChat />
      </div>
      <CommentsContainer />
    </section>
  );
};

export default WatchPage;

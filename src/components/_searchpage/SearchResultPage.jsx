import React from "react";
import useResultQuery from "../../hooks/useResultQuery";
import VideoResult from "../VideoResult";


const SearchResultPage = () => {
  // const {result} = useResultQuery()
  // console.log(result)

  return (
    <div>
      <h1 className=" text-md font-medium ml-[3rem] py-[2rem]">Search Result Page</h1>
      <div className="w-full">
        <VideoResult/>
      </div>
    </div>
  );
};

export default SearchResultPage;

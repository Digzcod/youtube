import React from "react";
import useResultQuery from "../../hooks/useResultQuery";
import VideoResult from "../VideoResult";


const SearchResultPage = () => {
  const {result} = useResultQuery()
  console.log(result)

  return (
    <div>
      <h1>Search Result Page</h1>
      <div>
        <VideoResult/>
      </div>
    </div>
  );
};

export default SearchResultPage;

import React from "react";
import Comments from "./Comments";

const CommentList = ({ data }) => {
  // console.log(data);
  return data.map((item, index) => {
    return (
      <section key={index} className="grid w-[100%] ">
        <Comments data={item}/>
        <div  className="ml-[3rem] w-[95.5%]">
          <CommentList data={item?.replies}/>
        </div>
      </section>
    );
  });
};

export default CommentList;

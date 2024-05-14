import React from "react";
import Button from "./Button";


const ButtonsList = () => {
 



  return (
    <section className="flex flex-wrap gap-2 pt-[1rem]">
      {listsWatch.map((listItem, index) => (
        <Button key={index} typeButton={listItem} />
      ))}
    </section>
  );
};
export default ButtonsList;

export const listsWatch = [
  "All",
  "Music",
  "NBA",
  "React JS",
  "JavaScript",
  "News",
  "Movie",
  "Tagalog",
  "TL Movie",
  "Bolly Wood",
  "TV5",
  "War",
  "JW",
  "abc"
];

import React from "react";
import { CiSearch } from "react-icons/ci";
import yt_logo from "../assets/yt_logo/YT.png";

import {
  PiListLight,
  PiMicrophoneThin,
  PiDotsThreeOutlineVerticalFill,
  PiUserCircleLight,
} from "react-icons/pi";
import className from "classnames";
import useSearchSuggestion from "../hooks/useSearchSuggestion";

const Head = () => {
  const {
    Link,
    suggestions,
    searchQuery,
    showSuggestions,
    selectedItem,
    searchBoxRef,
    scrollSuggestionsRef,
    setShowSuggestions,
    handleKeysDown,
    handleMenuToggle,
    handleSearch,
    handleSearchResult,
    handChangeInput,
    handleMouseEffect,
    handleMouseLeaveEffect

  } = useSearchSuggestion();

  return (
    <section className="w-full flex justify-between px-[1.5rem] py-[.5rem] shadow-sm">
      <div className="flex items-center">
        <PiListLight
          onClick={() => handleMenuToggle()}
          className="text-[1.7rem] ml-2  mr-[1.6rem] text-gray-600 cursor-pointer"
        />
        <Link to="/" className="flex">
          <img
            src={yt_logo}
            alt=""
            className="w-[2.5rem] h-[2rem] bg-black mx-2"
          />
          <h1 className="font-bold text-2xl">YouTube</h1>
        </Link>
      </div>

      <div>
        <div className="flex items-center">
          <input
            ref={searchBoxRef}
            type="search"
            className="w-[30rem] h-[2.5rem] py-[auto] pl-[1.5rem] pr-2 border rounded-l-full outline-none"
            id="suggestion-list"
            placeholder="Search"
            value={searchQuery}
            onChange={handChangeInput}
            onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setShowSuggestions(false)}
            onKeyDown={handleKeysDown}
            onClick={() => setShowSuggestions(true)}
          />
          <button className={backgroundEffect} onClick={() => handleSearch()}>
            <CiSearch className=" text-2xl text-gray-500" />
          </button>

          <section className={micIcon}>
            <PiMicrophoneThin className="text-[1.4rem]" />
          </section>
        </div>
        {showSuggestions && searchQuery !== "" && (
          <div
            ref={scrollSuggestionsRef}
            className="fixed bg-slate-50 w-[30.5rem] mt-2 px-1 py-3 rounded-md pb-4"
            onMouseEnter={handleMouseEffect}
            onMouseLeave={handleMouseLeaveEffect}
            // id="suggestion-list"
          >
            {suggestions.map((data, index) => (
              <ul
                key={index}
                className={className("p-2", {
                  [listHoverEffect]: selectedItem === index,
                })}
              >
                <li
                  className={
                    selectedItem === index
                      ? `${listHoverEffect}`
                      : "flex items-center font-medium "
                  }
                  onClick={() => handleSearchResult(data, index)}
                  onMouseEnter={() => handleMouseEffect(index)}
                >
                  {" "}
                  <CiSearch className="text-xl mx-2 text-gray-500" />
                  {data}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <PiDotsThreeOutlineVerticalFill className="text-lg text-gray-500 mr-[1.5rem]" />
        <button className={btnEffect}>
          <PiUserCircleLight className="mr-2 text-[1.5rem] cur" />
          Sign in
        </button>
      </div>
    </section>
  );
};

export default Head;

const backgroundEffect = className(
  "bg-slate-50 h-[2.5rem] px-[2rem] border rounded-r-full",
  {
    "hover:bg-gray-200": true,
  }
);
const btnEffect = className(
  `
  flex items-center 
  text-blue-500 text-md 
  px-[1.5rem] py-1 
  bg-slate-200
  rounded-l-full rounded-r-full
  `,
  {
    "hover:bg-blue-100 font-semibold": true,
  }
);
const micIcon = className(
  `
    ml-[2rem]
    py-[.7rem] px-[.7rem] 
    bg-slate-100 
    rounded-full 
  `,
  {
    "hover:bg-slate-200": true,
  }
);

const listHoverEffect = className(
  `
  flex items-center
  rounded
  font-[500]
  bg-slate-200
 `
);

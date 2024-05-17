import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { CiSearch } from "react-icons/ci";
import yt_logo from "../assets/yt_logo/YT.png";
import { useDispatch, useSelector } from "react-redux";

import {
  PiListLight,
  PiIdentificationBadgeLight,
  PiMicrophoneThin,
  PiDotsThreeOutlineVerticalFill,
  PiUserCircleLight,
} from "react-icons/pi";
import className from "classnames";
import { toggleMenu } from "../redux/features/appMenuSlice";
import {
  YOUTUBE_SEARCH_RESULT_API,
  YT_AUTOCOMPLETE_SEARCH_QUERY_API,
} from "../utils/constants";
import { handleCacheSearchResults } from "../redux/features/cacheSearchResultSlice";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [freeze, setFreeze] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);
  const scrollSuggestionsRef = useRef(null);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();
  const [userSelected, setUserSelected] = useState(false);

  const cacheSearchResultsOutput = useSelector(
    (store) => store.cacheSearchResults
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery && !userSelected) {
      const timer = setTimeout(() => {
        if (cacheSearchResultsOutput[searchQuery]) {
          setSuggestions(cacheSearchResultsOutput[searchQuery]);
        } else {
          getSearchQuery();
        }
      }, 250);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery, userSelected]);

  const getSearchQuery = useCallback(async () => {
    console.log("getSearch Query is Called");
    const data = await fetch(YT_AUTOCOMPLETE_SEARCH_QUERY_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      handleCacheSearchResults({
        [searchQuery]: json[1],
      })
    );
  }, [searchQuery]);

  const handChangeInput = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setFreeze(false);
    // scrollSuggestionsRef.current = document.getElementById("suggestion-list");

    const inputValue = e.target.value.trim(); // Trim input value
    if (inputValue.length > 0) {
      // Check if at least two characters are typed
      if (!userSelected && searchQuery !== undefined) {
        getSearchQuery();
      } else {
        setUserSelected(false);
      }
    } else {
      setSuggestions([]); // Clear suggestions if less than two characters
      if (!freeze) setFreeze(true);
      setSelectedItem(-1)
    }
  
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDown);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScrollDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [scrollSuggestionsRef, searchBoxRef]);

  const handleScrollDown = () => {
    if (scrollSuggestionsRef.current) {
      const { top } = scrollSuggestionsRef.current.getBoundingClientRect();
      if (top < window.innerHeight) setShowSuggestions(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      (!scrollSuggestionsRef.current ||
        !scrollSuggestionsRef.current.contains(event.target)) &&
      (!searchBoxRef.current || !searchBoxRef.current.contains(event.target))
    ) {
      setShowSuggestions(false); // Close suggestion list if clicked outside of it
    }
  };

  const handleMouseEffect = (index) => {
    setSelectedItem(index);
    setSearchQuery(suggestions[index]);
    setUserSelected(true);
    handleMouseEffect;
  };

  const handleMouseLeaveEffect = () => {
    setSelectedItem(-1);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const formattedQuery = searchQuery.trim().replace(/\s+/g, "-");
      navigate(`search-result?videos=${formattedQuery}`);
    }
  };

  const handleKeysDown = useCallback(
    (e) => {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
        setFreeze(true);
        setSearchQuery(suggestions[selectedItem - 1]);
        setUserSelected(true);
        e.preventDefault();
      }
      if (e.key === "ArrowDown" && selectedItem < suggestions.length - 1) {
        setSelectedItem((prev) => prev + 1);
        setFreeze(true);
        setSearchQuery(suggestions[selectedItem + 1]);
        setUserSelected(true);
        e.preventDefault();
      }

      // Only update searchQuery when Enter key is pressed
      if (e.key === "Enter") {
        if (selectedItem >= 0) {
          handleSearchResult(suggestions[selectedItem], selectedItem);
        } else if (searchQuery.trim() !== "") {
          handleSearchResult(searchQuery, -1);
        }
      }
    },
    [handChangeInput, handleMouseEffect]
  );

  

  const handleSearchResult = (selectedSuggestion, index) => {
    // const formattedQuery = selectedSuggestion.trim().replace(/\s+/g, "-");
    // Update search query with selected suggestion
    // navigate(`search-result?videos=${formattedQuery}`);
    setSearchQuery(selectedSuggestion);
    setSelectedItem(index);
    setShowSuggestions(false);
    if(selectedItem === 0) {
      setSelectedItem(index);
    }
    handleSearch()
  };

  function handleMenuToggle() {
    dispatch(toggleMenu());
  }

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
            onClick={()=>setShowSuggestions(true)}
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

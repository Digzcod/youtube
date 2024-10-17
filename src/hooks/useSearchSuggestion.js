import { useState, useEffect, useRef, useCallback } from "react";
import { toggleMenu } from "../redux/features/appMenuSlice";
import { handleCacheSearchResults } from "../redux/features/cacheSearchResultSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const useSearchSuggestion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);
  const scrollSuggestionsRef = useRef(null);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();
  const [userSelected, setUserSelected] = useState(true);

  const query_YT =
    process.env.REACT_APP_CORS_PROXY +
    process.env.REACT_APP_YT_AUTOCOMPLETE_SEARCH_QUERY_API;
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
    const data = await fetch(query_YT + searchQuery);
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

    const inputValue = e.target.value.trim(); // Trim input value
    if (inputValue.length > 0) {
      if (!userSelected && searchQuery !== undefined) {
        getSearchQuery();
      } else {
        setUserSelected(false);
      }
    } else {
      setSuggestions([]); // Clear suggestions if less than two characters
      setSelectedItem(-1);
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
        setSearchQuery(suggestions[selectedItem - 1]);
        setUserSelected(true);
        e.preventDefault();
      }
      if (e.key === "ArrowDown" && selectedItem < suggestions.length - 1) {
        setSelectedItem((prev) => prev + 1);
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
    setSearchQuery(selectedSuggestion);
    setSelectedItem(index);
    setShowSuggestions(false);
    if (selectedItem === 0) {
      setSelectedItem(index);
    }
    handleSearch();
  };

  function handleMenuToggle() {
    dispatch(toggleMenu());
  }

  return {
    Link,
    suggestions,
    showSuggestions,
    searchQuery,
    selectedItem,
    searchBoxRef,
    scrollSuggestionsRef,
    handleMenuToggle,
    handleSearch,
    handleMouseEffect,
    handleMouseLeaveEffect,
    handChangeInput,
    handleKeysDown,
    setShowSuggestions,
    handleSearchResult,
  
  };
};

export default useSearchSuggestion;

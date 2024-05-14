import React, { useEffect, useState } from "react";
import {
  PiXLight,
  PiDotsThreeOutlineVerticalFill,
  PiPaperPlaneRightLight,
} from "react-icons/pi";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/features/chatSlice";
import {
  generateRandomName,
  generateRandomText,
} from "../../utils/ramdomName";
import { generateDynamicEmojis } from "../../utils/randomEmojis";



import weStyle from "classnames";

const LiveChat = () => {
  const [liveChatMessage, setLiveChatMessage] = useState("");

  const chatMessage = useSelector((store) => store.liveChatMessage.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        addMessage({
          // name: "SJ",
          // message: "Their movies and musics are awesome! 🔥😍❤",
          name: generateRandomName(),
          message: generateRandomText(1, 1) + generateDynamicEmojis(),
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitLiveMessage = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        name: "Stephen",
        message: liveChatMessage,
      })
    );
    setLiveChatMessage('')
  };

  return (
    <section className="w-[26%] h-[600px] rounded-2xl border mx-3 overflow-hidden">
      <div className="h-[3rem] flex items-center border-b-[1px] border-gray-100 py-3 text-center  text-md font-semibold px-3 bg-slate-50">
        <span className="mr-auto text-sm font-bold">Live Chat</span>
        <PiDotsThreeOutlineVerticalFill className="mr-4" />
        <PiXLight className=" text-2xl" />
      </div>

      <section className="border overflow-y-scroll flex flex-col-reverse h-[480px]">
        {/* <div></div> */}

        <div className="px-2">
          {chatMessage.map((m, i) => (
            <ChatMessage key={i} name={m.name} message={m.message} />
          ))}
        </div>
      </section>

      <form
        onSubmit={handleSubmitLiveMessage}
        className="flex items-center py-3 px-3 h-[a]"
      >
        <input
          type="text"
          name="message"
          id=""
          className={inputStyle}
          value={liveChatMessage}
          onChange={(e) => setLiveChatMessage(e.target.value)}
        />
        <button>
          <PiPaperPlaneRightLight 
          className="text-3xl mx-1 text-gray-300 items-baseline hover:text-blue-500" 
          />
        </button>
      </form>
    </section>
  );
};

export default LiveChat;



export const inputStyle = weStyle(
`
w-[20rem] ml-auto py-2 px-4
border border-gray-300
text-[14px]
rounded-full
tracking-wider
`,
  {
    // "border-blue-400": true,
    "focus:outline-blue-400 focus:outline-1": true,
  }
);

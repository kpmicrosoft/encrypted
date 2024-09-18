import { useState } from "react";
import EncryptedButton from "../Button/button";

interface Props {
  onSend: (message: string) => void;
  isAiThinking: boolean;
}


export default function ChatInput({ onSend, isAiThinking }: Props): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue(""); // Clear the input after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="items-stretch flex m-3">
      <input
        className="chat-input p-3"
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isAiThinking}
      ></input>
      <EncryptedButton text="SEND" onClick={handleSendClick}></EncryptedButton>
    </div>
  );
}
import { useEffect, useState } from "react";
import Message, { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { ClearChatSession, Level_3_Encryption_Validation, sendMessageToAi } from "../../common/services/Copilot/copilot-service";
import EncryptedButton from "../../common/components/Button/button";

import "./decryption.scss";
import { CircularProgress } from "@mui/material";

interface ICoordinates {
  x: number,
  y: number
}

export default function Decryption() {

  let [encryptedCoordinates, setEncryptedCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  let [decryptedCoordinates, setDecryptedCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  let [xValue, setXValue] = useState<string>("");
  let [yValue, setYValue] = useState<string>("");

  let [success, setSuccess] = useState<boolean>(false);
  let [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (initialized) { return }
    ClearChatSession()
      .then(Level_3_Encryption_Validation)
      .then((response) => {
        setEncryptedCoordinates(response.data);
        setDecryptedCoordinates(response.data.original);
        setInitialized(true);
      })
  }, []);

  let [chatMessages, setChatMessages] = useState<IMessage[]>([
    {
      message: "Welcome to Level3 this level is called: Decrypt IT",
      user: UserType.Bot
    },
    {
      message: "We received the astronaut's coordinates!",
      user: UserType.Bot
    },
    {
      message: `The standard encryption method is using the Vigenere Cipher with the "GALAXY" key. My decryption systems are malfunctioning. Can you do it manually?`,
      user: UserType.Bot,
    }
  ])

  const addMessageToFeed = (message: string | JSX.Element, user: UserType) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { message: message, user: user },
    ]);
  };

    const popMessageToFeed = () => {
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, prevMessages.length - 1),
      ]);
    };

  const onMessageSent = (message: string) => {
    addMessageToFeed(message, UserType.User);
    addMessageToFeed(<CircularProgress color="secondary" />, UserType.Bot);
    sendMessageToAi(message).then((response) => {
      popMessageToFeed();
      addMessageToFeed(response.data.response, UserType.Bot);
    });
  }

  const launch = () => {
    console.log(xValue == decryptedCoordinates.x + "");
    if (xValue == decryptedCoordinates.x + "") {
      if(xValue == decryptedCoordinates.x + ""){
          addMessageToFeed(
            <CircularProgress color="secondary" />,
            UserType.Bot
          );
        return;
      }
      return;
    }
  }

  return (
    <div className="">
      <Message
        user={UserType.Astronaut}
        message={`My coordinates are ##X:${encryptedCoordinates.x}## and ##Y:${encryptedCoordinates.y}##. I used the standard encryption method for this.`}
      />
      <div className="my-2">
        <h3>ENTER DESTINATION COORDINATES</h3>
        <div className="my-2">
          <input
            className="coordinate"
            placeholder="X"
            onChange={(e) => setXValue(e.target.value)}
          ></input>
          <input
            className="coordinate"
            placeholder="Y"
            onChange={(e) => setYValue(e.target.value)}
          ></input>
        </div>
        <EncryptedButton text="LAUNCH" onClick={launch}/>
      </div>
      <Conversation
        messages={chatMessages}
        onMessageSent={onMessageSent}
        isAiThinking={false}
      ></Conversation>
    </div>
  );
}

import { useEffect, useState } from "react";
import Message, { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { Level_3_Encryption_Validation, sendMessageToAi } from "../../common/services/Copilot/copilot-service";
import EncryptedButton from "../../common/components/Button/button";

import "./decryption.scss";

interface ICoordinates {
  x: number,
  y: number
}

export default function Decryption() {

  let [encryptedCoordinates, setEncryptedCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  let [decryptedCoordinates, setDecryptedCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });

  let [success, setSuccess] = useState<boolean>(false);
  let [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (initialized) { return }
    Level_3_Encryption_Validation().then((response) => {
      setEncryptedCoordinates(response.data);
      setDecryptedCoordinates(response.data.original);
      setInitialized(true);
    })
  }, []);

  let [chatMessages, setChatMessages] = useState<IMessage[]>([
    {
      message: "We received the astronaut's coordinates!",
      user: UserType.Bot
    },
    {
      message: `The standard encryption method is using the Vigenere Cipher with the "GALAXY" key. My decryption systems are malfunctioning. Can you do it manually?`,
      user: UserType.Bot,
    }
  ])

  const addMessageToFeed = (message: string, user: UserType) => {
    setChatMessages((prevMessages) => [...prevMessages, { message: message, user: user }]);
  }

  const onMessageSent = (message: string) => {
    addMessageToFeed(message, UserType.User);
    sendMessageToAi(message).then((response) => {
      addMessageToFeed(response.data.response, UserType.Bot);
    });
  }

  return (
    <div>
      <Message user={UserType.Astronaut} message={`My coordinates are ##X:${encryptedCoordinates.x}## and ##Y:${encryptedCoordinates.y}##. I used the standard encryption method for this.`} />
      <div className="my-2">
        <h3>ENTER DESTINATION COORDINATES</h3>
        <div className="my-2">
          <input className="coordinate" placeholder="X"></input>
          <input className="coordinate" placeholder="Y"></input>
        </div>
        <EncryptedButton text="LAUNCH" />
      </div>
      <Conversation messages={chatMessages} onMessageSent={onMessageSent}></Conversation>
    </div>
  );
}
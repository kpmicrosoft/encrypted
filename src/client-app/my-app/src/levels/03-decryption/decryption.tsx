import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { sendMessageToAi } from "../../common/services/Copilot/copilot-service";

export default function Decryption() {

  let [chatMessages, setChatMessages] = useState<IMessage[]>([
    {
      message: "Help save the astronaut using decryption!",
      user: UserType.Bot
    },
    {
      message: "You can find the astronaut at ",
      user: UserType.Bot,
    },
    {
      message: "It seems the coordinates are encrypted using Vigener cypher. Can you decrypt it?",
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
    <Conversation messages={chatMessages} onMessageSent={onMessageSent}></Conversation>
  );
}
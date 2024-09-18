import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import {
  GetSosMessages,
  ISosMessage,
} from "../../common/services/planet-phishing-service";
import {
  IMessage,
  UserType,
} from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { ClearChatSession, sendMessageToAi } from "../../common/services/Copilot/copilot-service";
import { shuffleArray } from "../../common/services/shuffler-service";
import { CircularProgress } from "@mui/material";

import "./spot-the-phish.scss";

export default function SpotThePhish() {
  //TODO: remove the default messages and retrieve them from API when it works
  const [sosMessages, setSosMessages] = useState<ISosMessage[]>([]);
  const [invalidMessages, setInvalidMessages] = useState<number[]>([]);
  const [isAiThinking, setAiIsThinking] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    ClearChatSession()
      .then(() => GetSosMessages())
      .then((response) => {
        initialize(response.response, response.invalid_ids);
      });
  }, []);

  let [chatMessages, setChatMessages] = useState<IMessage[]>([]);

  const initialize = (
    sosMessages: ISosMessage[],
    invalidMessageIds: number[]
  ) => {
    setSosMessages(shuffleArray(sosMessages));
    setInvalidMessages(invalidMessageIds);
    setChatMessages([
      {
        message: "Welcome to Level 2 this level is called: Spot the Phish",
        user: UserType.Bot,
      },
      {
        message: "Help find our astronaut, but beware of fake distress calls.",
        user: UserType.Bot,
      },
    ]);
  };

  const onSosMessageClicked = (sosMessage: ISosMessage) => {
    if (success) {
      return;
    }
    if (invalidMessages.indexOf(sosMessage.id)) {
      addMessageToFeed(
        "This is a fake distress call. Try again!",
        UserType.Bot
      );
    } else {
      setSuccess(true);
      addMessageToFeed(
        "This is a real distress call. Well done!",
        UserType.Bot
      );
      addMessageToFeed(
        <a
          href={"/level3"}
          className="next-level-link flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          Click here to continue our adventure!
        </a>,
        UserType.Bot
      );
    }
  };

  const sosMessageBoxes = sosMessages?.map((message) => (
    <SosMessage onClick={onSosMessageClicked} sosMessage={message} />
  ));

  const onMessageSent = (message: string) => {
    addMessageToFeed(message, UserType.User);
    addMessageToFeed(<CircularProgress color="secondary" />, UserType.Bot);
    sendMessageToAi(message).then((response) => {
      popMessageToFeed();
      addMessageToFeed(response.data.response, UserType.Bot);
    });
  };

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

  return (
    <div className="flex w-full">
      <div className="sos-messages">{sosMessageBoxes}</div>
      <div className="conversation-container">
        <Conversation
          messages={chatMessages}
          onMessageSent={onMessageSent}
          isAiThinking={isAiThinking}
        ></Conversation>
      </div>
    </div>
  );
}

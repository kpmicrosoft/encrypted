import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { ClearChatSession, sendMessageToAi } from "../../common/services/Copilot/copilot-service";
import { shuffleArray } from "../../common/services/shuffler-service";
import EncryptedButton from "../../common/components/Button/button";

export default function SpotThePhish() {
  //TODO: remove the default messages and retrieve them from API when it works
  const [sosMessages, setSosMessages] = useState<ISosMessage[]>([]);
  const [invalidMessages, setInvalidMessages] = useState<number[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    ClearChatSession()
      .then(() => GetSosMessages())
      .then((response) => {
        initialize(response.response, response.invalid_ids);
      });
  }, []);

  let [chatMessages, setChatMessages] = useState<IMessage[]>([])

  const initialize = (sosMessages: ISosMessage[], invalidMessageIds: number[]) => {
    setSosMessages(shuffleArray(sosMessages))
    setInvalidMessages(invalidMessageIds)
    setChatMessages([
      {
        message: "Help find our astronaut, but beware of fake distress calls.",
        user: UserType.Bot
      }
    ])
  }

  const onSosMessageClicked = (sosMessage: ISosMessage) => {
    if (success) { return }
    if (invalidMessages.indexOf(sosMessage.id)) {
      addMessageToFeed("This is a fake distress call. Try again!", UserType.Bot);
    } else {
      setSuccess(true);
      addMessageToFeed("This is a real distress call. Well done!", UserType.Bot);
      addMessageToFeed(
        <a
          href={"/level3"}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >Click here to continue our adventure!</a>
        , UserType.Bot);
    }
  }

  const sosMessageBoxes = sosMessages.map((message) =>
    <SosMessage onClick={onSosMessageClicked} sosMessage={message} />
  );

  const onMessageSent = (message: string) => {
    addMessageToFeed(message, UserType.User);
    sendMessageToAi(message).then((response) => {
      addMessageToFeed(response.data.response, UserType.Bot);
    });
  }

  const addMessageToFeed = (message: string | JSX.Element, user: UserType) => {
    setChatMessages((prevMessages) => [...prevMessages, { message: message, user: user }]);
  }

  return (
    <div>
      <div>
        {!success && sosMessageBoxes}
      </div>
      <Conversation messages={chatMessages} onMessageSent={onMessageSent}></Conversation>
    </div>
  );
}
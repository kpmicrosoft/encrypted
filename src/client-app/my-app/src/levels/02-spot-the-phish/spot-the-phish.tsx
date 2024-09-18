import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";
import { sendMessageToAi } from "../../common/services/Copilot/copilot-service";

export default function SpotThePhish() {
  //TODO: remove the default messages and retrieve them from API when it works
  const [sosMessages, setSosMessages] = useState<ISosMessage[]>([]);
  const [invalidMessages, setInvalidMessages] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const response = await GetSosMessages();
      initialize(response.response, response.invalid_ids);
    })();
  }, []);

  let [chatMessages, setChatMessages] = useState<IMessage[]>([])

  const initialize = (sosMessages: ISosMessage[], invalidMessageIds: number[]) => {
    setSosMessages(sosMessages)
    setInvalidMessages(invalidMessageIds)
    setChatMessages([
      {
        message: "Help find our astronaut, but beware of fake distress calls.",
        user: UserType.Bot
      }
    ])
  }
  
  const onSosMessageClicked = (sosMessage: ISosMessage) => {
    if (invalidMessages.indexOf(sosMessage.id)) {
      setChatMessages([...chatMessages, { message: "This is a fake distress call. Try again!", user: UserType.Bot }]);
    } else {
      setChatMessages([...chatMessages, { message: "This is a real distress call. Well done!", user: UserType.Bot }]);
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

  const addMessageToFeed = (message: string, user: UserType) => {
    setChatMessages((prevMessages) => [...prevMessages, { message: message, user: user }]);
  }

  return (
    <div>
      <div>
        {sosMessageBoxes}
      </div>
        <Conversation messages={chatMessages} onMessageSent={onMessageSent}></Conversation>
    </div>
  );
}
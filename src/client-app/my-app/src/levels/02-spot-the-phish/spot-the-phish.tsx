import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";

export default function SpotThePhish() {
  //TODO: remove the default messages and retrieve them from API when it works
  const [sosMessages, setSosMessages] = useState<ISosMessage[]>([]);
  const [invalidMessages, setInvalidMessages] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const response = await GetSosMessages();
      setSosMessages(response.response)
      setInvalidMessages(response.invalid_ids)
    })();
  }, []);


  const onSosMessageClicked = (sosMessage: ISosMessage) => {
    if(invalidMessages.indexOf(sosMessage.id)){
      setChatMessages([...chatMessages, { message: "This is a fake distress call. Try again!", user: UserType.Bot }]);
    } else {      
      setChatMessages([...chatMessages, { message: "This is a real distress call. Well done!", user: UserType.Bot }]);
    }
  }

  const sosMessageBoxes = sosMessages.map((message) =>
    <SosMessage onClick={onSosMessageClicked} sosMessage={message} />
  );

  let [chatMessages, setChatMessages] = useState<IMessage[]>([
    {
      message: "Help find our astronaut, but beware of fake distress calls.",
      user: UserType.Bot
    }
  ])

  const onMessageSent = (message: string) => {
    setChatMessages([...chatMessages, { message: message, user: UserType.User }]);

    //TODO: call the backend to get the response
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
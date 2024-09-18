import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";

export default function SpotThePhish() {
  //TODO: remove the default messages and retrieve them from API when it works
  const [sosMessages, setSosMessages] = useState<ISosMessage[]>([
    {
      name: "Astronaut",
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      description: "An astronaut has gone missing",
      message: "Help me! I am lost in space",
      code: "SOS"
    },
    {
      name: "Astronaut",
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      description: "An astronaut has gone missing",
      message: "Help me! I am lost in space",
      code: "SOS"
    },
    {
      name: "Astronaut",
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      description: "An astronaut has gone missing",
      message: "Help me! I am lost in space",
      code: "SOS"
    }
  ]);
  useEffect(() => {
    (async () => {
      // TODO: call api for messages - right now it fails so we're using the defaults above
      // setSosMessages(await GetSosMessages())
    })();
  });
  const sosMessageBoxes = sosMessages.map((message) =>
    <SosMessage sosMessage={message} />
  );

  let [chatMessages, setChatMessages] = useState<IMessage[]>([
    {
      message: "Help find our astronaut, but beware of fake distress calls.",
      user: UserType.Bot
    },
    {
      user: UserType.Bot,
      message: <div>{sosMessageBoxes}</div>
    }
  ])

  const onMessageSent = (message: string) => {
    setChatMessages([...chatMessages, { message: message, user: UserType.User }]);

    //TODO: call the backend to get the response
  }

  return (
      <Conversation messages={chatMessages} onMessageSent={onMessageSent}></Conversation>
  );
}
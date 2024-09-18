import { useEffect, useState } from "react";
import TextBox from "../../common/components/TextBox/text-box";
import BaseLayout from "../../common/layouts/base";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import Message, { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";

export default function PlanetPhish() {
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
      setSosMessages(await GetSosMessages())
    })();
  });
  const sosMessageBoxes = sosMessages.map((message) =>
    <SosMessage sosMessage={message} />
  );

  const messages: IMessage[] = [
    {
      message: "Help find our astronaut, but beware of fake distress calls.",
      user: UserType.Bot
    },
    {
      user: UserType.Bot,
      message: <div>{sosMessageBoxes}</div>
    }
  ]

  return (
    <BaseLayout>
      <Conversation messages={messages}></Conversation>
    </BaseLayout>
  );
}
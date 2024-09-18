import { useEffect, useState } from "react";
import SosMessage from "../../common/components/SosMessage/sos-message";
import { GetSosMessages, ISosMessage } from "../../common/services/planet-phishing-service";
import { IMessage, UserType } from "../../common/components/Conversation/message";
import Conversation from "../../common/components/Conversation/conversation";

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
			message: "It seems the coordinates are written in a language the FLUTRON planet uses. Use the following translation guide to find the location of the astronaut",
      user: UserType.Bot,
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
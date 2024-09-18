import ChatInput from "./chatInput";
import Message, { IMessage } from "./message";
import "./conversation.scss";
import { useEffect, useRef } from "react";
interface Props {
  messages: IMessage[],
  onMessageSent: (message: string) => void;
}

export default function Conversation({ messages, onMessageSent }: Props): JSX.Element {
  const messageBoxes = messages.map((message) =>
    <Message message={message.message} user={message.user} />);

  const messageFeedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageFeedRef.current) {
      messageFeedRef.current.scrollTop = messageFeedRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="conversation p-3">
      <div className="message-feed" ref={messageFeedRef}>
        {messageBoxes}
      </div>
      <ChatInput onSend={onMessageSent}></ChatInput>
    </div>
  );
}
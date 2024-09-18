import Message, { IMessage } from "./message";

interface Props {
  messages: IMessage[]
}

export default function Conversation({ messages }: Props): JSX.Element {
  const messageBoxes = messages.map((message) =>
    <Message message={message.message} user={message.user} />);
  return (
    <div>
      Conversation
      <div className="message-feed p-2">
        {messageBoxes}
      </div>
    </div>
  );
}
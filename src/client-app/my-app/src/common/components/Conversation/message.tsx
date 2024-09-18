import "./conversation.scss"
export interface IMessage {
  message: string | JSX.Element;
  user: UserType
}

export enum UserType {
  User,
  Bot
}

const userImage = `/img/hacker man.png`;
const botImage = `/img/hacker-face.png`;

export default function Message({ message, user }: IMessage): JSX.Element {
  function getIcon() {
    return user === UserType.User ? userImage : botImage;
  }

  function getAlt() {
    return user === UserType.User ? "User" : "Bot";
  }

  return (
    <div className="message m-2 p-1 flex flex-row">
      <div className="flex-none">
        <img className="icon logo" src={getIcon()} alt={getAlt()}></img>
      </div>
      <p className="m-2 message-text">{message}</p>
    </div>
  );
}
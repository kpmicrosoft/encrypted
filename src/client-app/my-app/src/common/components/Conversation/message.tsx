import "./conversation.scss"
export interface IMessage {
  message: string | JSX.Element;
  user: UserType
}

export enum UserType {
  User,
  Bot,
  Astronaut
}

const userImage = `/img/orange-hacker.png`;
const botImage = `/img/hacker-face.png`;
const astronautImage = `/img/hacker-astronaut.jpeg`;

export default function Message({ message, user }: IMessage): JSX.Element {
  function getIcon() {
    switch (user) {
      case UserType.User:
        return userImage;
      case UserType.Bot:
        return botImage;
      case UserType.Astronaut:
        return astronautImage;
    }
  }

  function getAlt() {
    switch (user) {
      case UserType.User:
        return "User";
      case UserType.Bot:
        return "Bot";
      case UserType.Astronaut:
        return "Astronaut";
    }
  }

  return (
    <div className="message m-2 p-1 flex flex-row min min-w-32">
      <div className="flex-none">
        <img className="icon logo" src={getIcon()} alt={getAlt()}></img>
      </div>
      <p className="m-2 message-text">{message}</p>
    </div>
  );
}
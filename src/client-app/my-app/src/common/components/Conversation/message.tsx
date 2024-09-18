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
  return (
    <div className="message m-2 p-1 flex flex-row">
      <div className="flex-none">
        <img className="icon logo" src={user == UserType.User ? userImage : botImage}></img>
      </div>
      <p >{message}</p>
    </div>
  );
}
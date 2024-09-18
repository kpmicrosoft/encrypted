import LeftNavButton from "./left-nav-button";
import LeftNavIcon from "./left-nav-icon";

export interface LeftNavButtonProps {
  text: string;
  onClick?: () => void;
  route?: string;
  icon: string;
}

export default function LeftNav(): JSX.Element {

  const leftNavButtons: LeftNavButtonProps[] = [
    {
      text: "Play",
        route: "/play",
        icon: "play",
    },
    {
      text: "Leader Board",
      route: "/leaderboard",
        icon: "img/leaderboard.png",
    },
  ];

  return (
    <ul className="font-medium">
      <li>
        <LeftNavIcon icon="/img/orange-hacker.png" name="Player 1" />
        {leftNavButtons.map((button) => (
          <LeftNavButton
            text={button.text}
            onClick={button.onClick}
            route={button.route}
            icon={button.icon}
          />
        ))}
      </li>
    </ul>
  );
}

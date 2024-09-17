import EncryptedButton from "../Button/button";

import './header.scss';

interface NavButton {
  text: string;
  route: string;
}

export default function Header(): JSX.Element {

  const navButtons: NavButton[] = [
    { text: "Profile", route: "Profile" },
    { text: "Dashboard", route: "Dashboard" },
    { text: "Resources", route: "Resources" },
  ];

  const menuItems = navButtons.map((button) => (
    <EncryptedButton text={button.text} route={button.route} />
  ));

  return (
    <header className="header inset-x-0 top-0 flex" color="primary">
      <nav
        className="items-center justify-between p-6 sm:px-8"
        aria-label="Global"
      >
        <div className="flex sm:gap-x-6 items-stretch">
          <img src={`img/hacker-face.png`} alt="Logo" className="logo" />
          {menuItems}
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-9002 self-end"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
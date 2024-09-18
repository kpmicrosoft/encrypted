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
    <EncryptedButton text={button.text} route={button.route} key={button.text}/>
  ));

  return (
    <header className="header py-2 inset-x-0 top-0 flex" color="primary">
      <nav
        className="flex items-center justify-between px-6 sm:px-8 sm:gap-x-6 items-stretch"
        aria-label="Global"
      >
        <img src={`/img/encrypted.png`} alt="Logo" className="logo" />
        {menuItems}
        <div className="flex flex-col justify-center">
          <a
            href="#"
            className="login-button text-sm font-semibold leading-6 self-end"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
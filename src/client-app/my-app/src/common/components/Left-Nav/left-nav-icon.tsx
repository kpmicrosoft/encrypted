import './left-nav.scss'

interface Props {
  icon: string;
  name: string;
}

export default function LeftNavIcon({ icon, name }: Props): JSX.Element {
  return (
    <div className="flex player-icon">
      <img src={icon} alt="Logo" className="icon logo" />
      {name}
    </div>
  );
}

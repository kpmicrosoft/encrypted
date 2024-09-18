import { LeftNavButtonProps } from "./left-nav";

export default function LeftNavButton({ text, icon, route }: LeftNavButtonProps): JSX.Element {
  return (
    <a
      href={route}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {/* <Icon>{icon}</Icon> */}
      <span className="flex-1 whitespace-nowrap">{text}</span>
    </a>
  );
}
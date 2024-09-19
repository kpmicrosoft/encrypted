import { useLocation } from "react-router-dom";
import BaseLayout from "../../common/layouts/base";
import "./landing.scss";
import LevelOne from "../../levels/01-enter-password/enter-password";
import SpotThePhish from "../../levels/02-spot-the-phish/spot-the-phish";



export default function Landing() {
  const location = useLocation(); // Get the current location

  return (
    <BaseLayout>
      <SpotThePhish />
      {!location.pathname.includes('level2') && <LevelOne />}
    </BaseLayout>
  );
}
import { useLocation } from "react-router-dom";
import BaseLayout from "../../common/layouts/base";
import "./landing.scss";
import SpotThePhish from "../../levels/02-Spot-the-Phish/spot-the-phish";
import LevelOne from "../../levels/01-Enter-Password/enter-password";

export default function Landing() {
  const location = useLocation(); // Get the current location

  return (
    <BaseLayout>
      <SpotThePhish />
      {!location.pathname.includes('level2') && <LevelOne />}
    </BaseLayout>
  );
}
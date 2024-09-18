import BaseLayout from "../../common/layouts/base";
import LevelOne from "../../levels/01-enter-password/enter-password";
import SpotThePhish from "../../levels/02-spot-the-phish/spot-the-phish";

import "./landing.scss";

export default function Landing() {
  return (
    <BaseLayout>
      <SpotThePhish/>
      <LevelOne />
    </BaseLayout>
  );
}
import TextBox from "../../common/components/TextBox/text-box";
import BaseLayout from "../../common/layouts/base";
import LevelOne from "../../levels/01-Enter-Password/enter-password";

import "./landing.scss";

export default function Landing() {
  return (
    <BaseLayout>
      <div className="intro">
        <TextBox text="Your first adventure is to unlock the secret password and fight your adversary" />
      </div>
      <LevelOne />
    </BaseLayout>
  );
}
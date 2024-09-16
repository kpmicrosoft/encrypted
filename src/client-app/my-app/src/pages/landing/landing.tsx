import AiResponse from "../../common/components/Ai-Response/ai-response";
import EncryptedButton from "../../common/components/Button/button";
import TextBox from "../../common/components/TextBox/text-box";
import BaseLayout from "../../common/layouts/base";
import { callGpt3 } from "../../common/services/Copilot/copilot-service";

export default function Landing() {
  return (
    <BaseLayout>
      <TextBox text="Your first adventure is to unlock the secret password and fight your adversary" />
      <AiResponse />
    </BaseLayout>
  );
}
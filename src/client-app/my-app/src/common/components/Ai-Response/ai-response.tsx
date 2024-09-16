import { callGpt3 } from "../../services/Copilot/copilot-service";
import EncryptedButton from "../Button/button";

export default function AiResponse(): JSX.Element {
    return (
      <div>
        <h1>AiResponse</h1>
        <input
          type="text"
          placeholder="Enter password"
          className="border-2 border-gray-300 rounded-lg p-2 w-1/2"
        />
        <EncryptedButton text="Submit" onClick={() => callGpt3()} />
      </div>
    );
}
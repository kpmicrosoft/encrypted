import { ISosMessage } from "../../services/planet-phishing-service";

import "./sos-message.scss";

interface Props {
    sosMessage: ISosMessage,
    onClick: (message: ISosMessage) => void
}

export default function SosMessage({sosMessage, onClick}: Props): JSX.Element {
    return (
        <div onClick={() => onClick(sosMessage)} className="sos-message m-1 p-2">
            <h3>MESSAGE: {sosMessage.message}</h3>
        </div>
    );
}
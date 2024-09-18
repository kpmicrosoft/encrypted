import { ISosMessage } from "../../services/planet-phishing-service";

import "./sos-message.scss";

interface Props {
    sosMessage: ISosMessage
}

export default function SosMessage({sosMessage}: Props): JSX.Element {
    return (
        <div className="sos-message m-1 p-2">
            <h3>MESSAGE: {sosMessage.message}</h3>
            <h3>DESCRIPTION: {sosMessage.description}</h3>
        </div>
    );
}
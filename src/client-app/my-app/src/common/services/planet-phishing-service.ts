import { Configuration, getConfig } from "../../configuration";

let config: Configuration = getConfig();

export interface ISosMessage{
    id: number;
    message: string;
    valid: boolean;
    reason: string;
}
export interface ISosResponse {
    invalid_ids: number[];
    response: ISosMessage[];
}
export async function GetSosMessages() : Promise<ISosResponse>{
    const response = await fetch(`http://${config.url}:${config.port}/api/level2/sos`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ISosResponse = await response.json();
    return data;
}
import { Configuration, getConfig } from "../../configuration";

let config: Configuration = getConfig();

export interface ISosMessage{
    color: string;
    description: string;
    id: number;
    message: string;
    name: string;
    valid: boolean;
}
export interface ISosResponse {
    invalid_ids: number[];
    parameters: {
        num_responses: number;
        num_valid: number;
        values: string;
    };
    query: string;
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
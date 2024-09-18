import { Configuration, getConfig } from "../../configuration";

let config: Configuration = getConfig();

export interface IPlanetCoordinates {
    latitude: number;
    longitude: number;
}
export interface ISosMessage{
    name: string;
    coordinates: IPlanetCoordinates;
    description: string;
    message: string;
    code: string;
}
export async function GetSosMessages() : Promise<ISosMessage[]>{
    const response = await fetch(`http://${config.url}:${config.port}/api/level2/sos`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ISosMessage[] = await response.json();
    return data;
}
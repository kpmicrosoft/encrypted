import axios from "axios";
import { Configuration, getConfig } from "../../../configuration";

export function sendMessageToAi(message: string) {
  let config: Configuration = getConfig();

  let url = `http://${config.url}:${config.port}/api/ai`;
  let body = {
    query: message,
    parameters: {
      num_valid: 1,
      num_responses: 1,
      values: "message"}
  };

  const options = {
    method: "POST",
    url: url,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: body,
  };
  
  return axios.request(options);
}

export async function Level_1_Password(password: string): Promise<any> {
  let config: Configuration = getConfig();
  let body = {
    password: password,
  };
  let url = `http://${config.url}:${config.port}/api/level1/password`;

  const options = {
    method: "POST",
    url: url,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: body,
  };

  return axios.request(options);
}

export function Level_2_SOS() {
  let config: Configuration = getConfig();

  return "GPT-4 called";
}

export function Level_3_Encryption_Validation() {
  let config: Configuration = getConfig();

  return "GPT-4 called";
}

export function Copilot_Help() {
  let config: Configuration = getConfig();

  return "GPT-4 called";
}

// export function Level4_Password() {
//     let config: Configuration = getConfig();

//     return "GPT-4 called";
// }

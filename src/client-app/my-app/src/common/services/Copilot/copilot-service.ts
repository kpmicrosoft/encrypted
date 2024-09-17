import axios from "axios";
import { Configuration, getConfig } from "../../../configuration";

export function callGpt3() {
  let config: Configuration = getConfig();

  return "GPT-3 called";
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

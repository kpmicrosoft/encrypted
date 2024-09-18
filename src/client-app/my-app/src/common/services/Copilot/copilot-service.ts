import axios from "axios";
import { Configuration, getConfig } from "../../../configuration";

export function sendMessageToAi(message: string) {
  let config: Configuration = getConfig();

  let url = `http://${config.url}:${config.port}/api/chat_bot`;
  let body = {
    query: message
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

export function Level_3_Encryption_Validation() {
  let config: Configuration = getConfig();
  let url = `http://${config.url}:${config.port}/api/level3/coordinates`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  return axios.request(options);
}

export function ClearChatSession() {
  let config: Configuration = getConfig();
  let url = `http://${config.url}:${config.port}/api/conversation`;

  const options = {
    method: "DELETE",
    url: url,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  return axios.request(options);
}
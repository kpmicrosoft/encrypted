export interface Configuration {
  url: string;
  port: number;
}

const devConfig: Configuration = {
  url: "48.211.219.114",
  port: 5000,
};

export function getConfig(): Configuration {
  return devConfig;
}
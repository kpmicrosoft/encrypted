export interface Configuration {
  url: string;
  port: number;
}

const devConfig: Configuration = {
  url: "172.210.234.90",
  port: 5000,
};

export function getConfig(): Configuration {
  return devConfig;
}
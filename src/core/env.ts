interface EnvConfig {
  uiBaseUrl: string;
  apiBaseUrl: string;
  graphqlBaseUrl: string;
}

function readEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : fallback;
}

export const env: EnvConfig = {
  uiBaseUrl: readEnv('UI_BASE_URL', 'https://demoqa.com'),
  apiBaseUrl: readEnv('API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
  graphqlBaseUrl: readEnv('GRAPHQL_BASE_URL', 'https://countries.trevorblades.com/graphql'),
};


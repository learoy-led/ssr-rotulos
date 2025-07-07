const fs = require('fs');

const envConfig = `
export const environment = {
  production: true,
  API_URL: '${API_URL}'
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfig);
const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

// Create both environment files regardless of the environment flag
const envPaths = [
  './src/environments/environment.ts',
  './src/environments/environment.prod.ts'
];

// Ensure the environments directory exists
const fs = require('fs');
const dir = './src/environments';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

// Generate environment files
envPaths.forEach((targetPath, index) => {
  const isProduction = index === 1; // second file is production


  const envConfigFile = `export const environment = {
  production: ${isProduction},
  emailjs: {
    serviceId: '${process.env["EMAILJS_SERVICE_ID"] || 'service_955xct9'}',
    templateId: '${process.env["EMAILJS_TEMPLATE_ID"] || 'template_tsqpjnq'}',
    publicKey: '${process.env["EMAILJS_PUBLIC_KEY"] || 'ejNtas6oWUoKJRdMI'}'
  }
};
`;

  // Write the content to the file
  writeFile(targetPath, envConfigFile, function (err: any) {
    if (err) {
      console.log(err);
    }
    console.log(`Output generated at ${targetPath}`);
  });
});

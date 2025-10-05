import { writeFileSync } from 'fs';

// Get version from package.json environment variable
const version = process.env.npm_package_version;

// Write to file
writeFileSync('./src/version.ts', `export const Version = "${version}";\n`, 'utf8');

console.log(`Generated src/version.ts with version ${version}`);
import fsPromises from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const filenameStr = fileURLToPath(import.meta.url);
const dirnameStr = path.dirname(filenameStr);

export async function writeSpecFiles(swaggerSpec: object): Promise<void> {
  try {
    // Write both JSON and YAML specs concurrently
    await Promise.all([
      fsPromises.writeFile(
        path.join(dirnameStr, '..', '..', 'openapi.json'),
        JSON.stringify(swaggerSpec, null, 2)
      ),
      fsPromises.writeFile(
        path.join(dirnameStr, '..', '..', 'openapi.yaml'),
        yaml.dump(swaggerSpec)
      ),
    ]);

    console.log('OpenAPI specification files generated successfully');
  } catch (error) {
    console.error('Error writing OpenAPI spec files:', error);
  }
}

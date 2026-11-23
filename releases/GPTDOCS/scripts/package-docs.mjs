import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('docs/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('dist/', root), output, { recursive: true });
// GitHub Pages must serve the shared assets in the _shared directory.
await writeFile(new URL('.nojekyll', output), '');
console.log(`Static pages packaged in ${fileURLToPath(output)}`);

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const buildId = process.env.BUILD_ID || process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], { encoding: 'utf8' }).trim();

export default defineConfig({
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  plugins: [{
    name: 'stamp-static-404-build-id',
    closeBundle() {
      const file = resolve('dist/404.html');
      writeFileSync(file, readFileSync(file, 'utf8').replace('__BUILD_ID__', buildId));
    }
  }]
});

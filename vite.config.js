import { readFileSync } from 'node:fs';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function devdexMdxRaw() {
  const rawExpression = /\.mdx\?raw(?:&.*)?$/;
  const virtualPrefix = '\0devdex-mdx-raw:';

  return {
    name: 'devdex-mdx-raw',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!rawExpression.test(source)) return null;

      const resolved = await this.resolve(source.split('?')[0], importer, {
        skipSelf: true,
      });

      return resolved ? `${virtualPrefix}${resolved.id}` : null;
    },
    load(id) {
      if (!id.startsWith(virtualPrefix)) return null;

      return {
        code: `export default ${JSON.stringify(readFileSync(id.slice(virtualPrefix.length), 'utf8'))};`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [
    devdexMdxRaw(),
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react(),
  ],
});

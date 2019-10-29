let specGlobs = [];
if (process.argv.includes('--client')) {
  specGlobs.push('src/client/**/__tests__/*.test.ts');
  specGlobs.push('src/client/**/__tests__/*.test.tsx');
}
if (process.argv.includes('--server')) {
  specGlobs.push('src/server/**/__tests__/*.test.ts');
  specGlobs.push('src/server/**/__tests__/*.test.tsx');
}
module.exports = {
  exit: true,
  ui: 'bdd',
  reporter: 'spec',
  timeout: 30000,
  recursive: true,
  require: [
    'ts-node/register',
    'raf/polyfill',
    'tsconfig-paths/register',
    'jsdom-global/register',
  ],
  extension: ['ts', 'tsx', 'js'],
  spec: specGlobs.length > 0
    ? specGlobs
    : ['src/**/*.test.ts', 'src/**/*/*.test.tsx'],
}

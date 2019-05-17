let specGlobs = [];
if (process.argv.includes('--client')) {
  specGlobs.push('src/client/**/__tests__/*.test.ts');
}
if (process.argv.includes('--server')) {
  specGlobs.push('src/server/**/__tests__/*.test.ts');
}
module.exports = {
  exit: true,
  ui: 'bdd',
  reporter: 'spec',
  timeout: 30000,
  file: '.mochainit.js',
  recursive: true,
  require: [
    'jsdom-global/register',
    'raf/polyfill',
    'ts-node',
  ],
  extension: ['ts'],
  spec: specGlobs.length > 0 ? specGlobs : 'src/**/*.test.ts',
}

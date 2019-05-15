let specGlobs = [];
if (process.argv.includes('--client')) {
  specGlobs.push('src/client/**/__tests__/*.test.js');
}
if (process.argv.includes('--server')) {
  specGlobs.push('src/server/**/__tests__/*.test.js');
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
    '@babel/polyfill',
    '@babel/register',
    'esm',
  ],
  extension: ['js'],
  spec: specGlobs.length > 0 ? specGlobs : 'src/**/*.test.js',
}

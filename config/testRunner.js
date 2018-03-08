process.env.BABEL_ENV = "testing";
process.env.NODE_ENV = "testing";
process.env.MONGODB_VERSION = "3.0.12";

require("babel-polyfill");
require("babel-register")({
  presets: [
    "react",
    ["env", { useBuiltIns: true, modules: false, targets: { node: "current" } }]
  ],
  ignore: null,
  plugins: [
    "transform-es2015-modules-commonjs",
    "transform-object-rest-spread",
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
});
require("ignore-styles");
require("raf/polyfill");

const Mocha = require("mocha");
const readdirrecursive = require("fs-readdir-recursive");
const path = require("path");
const chokidar = require("chokidar");

process.on("unhandledRejection", err => {
  throw err;
});

let runner;

//create a jsdom instance for rendering
const jsdom = require("jsdom-global")();
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

// exit with non-zero status if there were failures
const exitOnFail = failures => {
  process.on("exit", failures => {
    jsdom();
    // console.log(failures);
  });
};

//get a list of all test spec files
let specs = readdirrecursive(path.resolve(__dirname, "../src"))
  .filter(
    file => file.substr(-8) === ".test.js" && !file.includes("PersonGraph")
  )
  .map(file => path.join("src", file));

//options for mocha output
const mochaOpts = {
  timeout: 30000,
  ui: "bdd",
  reporter: process.env.REPORTER
};

//function to actually run mocha
const runMocha = () => {
  //flush any cached modules
  Object.keys(require.cache).forEach(key => delete require.cache[key]);
  //create a mocha instance
  const mocha = new Mocha(mochaOpts);
  //read in the global configs for snapshotting
  mocha.addFile(path.resolve(__dirname, "./mocha.js"));
  //add all of the other files.
  specs.forEach(spec => mocha.addFile(spec));
  try {
    runner = mocha.run(exitOnFail());
    runner.on("end", () => {
      runner = undefined;
    });
    return runner;
  } catch (err) {
    console.error(err);
  }
};

if (process.argv.includes("--watch")) {
  chokidar
    //watch the test files and add new ones to the list on creation
    .watch("src/**/*.test.js", {
      ignored: /(^|[/\\])\../,
      persistent: true
    })
    .on("add", file => specs.push(file));
  chokidar
    //watch all non-snapshot files in src
    .watch("src/", {
      ignored: [/(^|[/\\])\../, "src/**/*.snap"],
      persistent: true
    })
    // run mocha whenever a file changes
    .on("change", file => {
      if (runner !== undefined) {
        runner.on("end", runMocha);
        runner.abort();
      } else {
        runMocha();
      }
    })
    //run mocha once at instantiation
    .on("ready", file => {
      runner = runMocha();
    })
    .on("error", error => console.log(`Watcher error: ${error}`));
} else {
  runMocha().on("end", () => {
    jsdom();
    process.exit();
  });
}

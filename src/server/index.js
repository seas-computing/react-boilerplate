import "babel-polyfill";
import http from "http";
import clearRequire from "clear-require";
import enableDestroy from "server-destroy";
import app from "./express";
import { SERVER } from "./config";

//Create the actual server
let server = http.createServer(app);
//allows the server to be immediately closed
enableDestroy(server);
let currentApp = app;
server.listen(SERVER.PORT, err => {
  console.log(`Listening on port ${SERVER.PORT}`);
});

//handle hot-reloading during development
if (module.hot) {
  //catch any changes that bubble up to the express server
  module.hot.accept(["./express/index.js", "./mongo/index.js"], () => {
    //flush the require cache to make sure we're loading the fresh changes
    clearRequire.all();
    //immediately close the server
    server.destroy(err => {
      console.log("server closed");
      //get the latest changes and apply them as a new listener on the server
      let newApp = require("./express").default;
      server.removeListener("request", currentApp);
      server.on("request", newApp);
      //start listening on the new server
      server.listen(SERVER.PORT, err => {
        console.log(`Listening on port ${SERVER.PORT}`);
      });
      //save a reference for next round
      currentApp = newApp;
    });
  });
}

//handle closing the server from the terminal
["SIGINT", "SIGTERM"].forEach(function(sig) {
  process.on(sig, function() {
    process.exit();
  });
});

# SEAS React Boilerplate

This is a starting point for javascript applications developed by the SEAS Applications Development Team.

This setup assumes that you have nodejs and npm installed on your system (NVM is the preferred [installation method](https://github.com/creationix/nvm)), and a mongodb server running locally (see website for [installation guide](https://docs.mongodb.com/manual/installation/)) on port 27017.

## Quick Start

A more extensive overview is available in the [wiki](https://code.harvard.edu/SEAS/seas-react-boilerplate/wiki), but to get up and running immediately:

### Clone the Repo

```bash
git clone git@code.harvard.edu:SEAS/seas-react-boilerplate.git <new-project-name>
cd <new-project-name>
git remote remove origin
git remote add origin <new-project-repo>
```

### Initial Configuration

From the project root, run:

```bash
npm install
cp src/server/config_default.js src/server/config.js
```

_You should edit your `src/server/config.js` to set necessary defaults. At a minimum, you will need to set the appropriate mongoDB collection._

### Development

```bash
npm run start
```

Then view the app at localhost:3000. This will watch your code, recompile on changes, and hot reload changes in the browser.

### Vagrant Build

To run the app inside a vagrant VM, use:

```bash
npm run vagrant
```

and open localhost:8080

To reload the vagrant server, run:

```bash
npm run vagrant:reload
```

### Testing

```bash
# To run tests once
npm run test

# To re-run tests when code changes
npm run test:watch
```

### Production Build

```bash
npm run build
```

This will compile the client and server code in the `build` directory.

### User Authorization

Authentication is handled through Harvard Key, and in Development a "QA User" account is automatically used. Authorization is handled through a `users` collection in MongoDB, based on HUID. In order to access any of the app's API endpoints in developemnt, you will need to create the QA User in your database first. Assuming mongod is running, this can be done from the command line with:

```bash
mongo 127.0.0.1/<database-name> --eval "db.users.insert({\
  HUID: \"88888888\",\
  accessLevel: \"Admin\", \
  email: \"help@seas.harvard.edu\", \
  firstName: \"QA\", \
  lastName: \"User\" \
})"
```

# SEAS React Boilerplate

[![Travis](https://img.shields.io/travis/com/seas-computing/react-boilerplate.svg)](https://travis-ci.com/seas-computing/react-boilerplate)
[![Codecov](https://img.shields.io/codecov/c/gh/seas-computing/react-boilerplate.svg)](https://codecov.io/gh/seas-computing/react-boilerplate)
[![Documentation](https://img.shields.io/badge/docs-TypeDoc-Blue.svg)](https://seas-computing.github.io/react-boilerplate/)
![GitHub top language](https://img.shields.io/github/languages/top/seas-computing/react-boilerplate.svg)

This is a starting point for javascript applications developed by the SEAS Applications Development Team. It provides a basic React starter in `src/client`, with a backend built on nestjs in `src/server`.

## Quick Start

This setup uses `docker` and `docker-compose` for local development, as defined in `docker-compose.yml`. Installation instructions for various platforms can be found [here][docker].

You'll also need to copy `.env-example` to `.env` and fill in the appropriate values.

Then to start the project, run:

```sh
docker-compose up
```

[docker]: https://docs.docker.com/install/

# Dronuts Team Donut Dave

- App is set up with node, eslint, and jest at the top level.

- An Express app for the backend was set up in a subdirectory.

- There is a Github Action that runs the linter, tests, and runs the app for a minute before shutting down.

- Another Github action deploys the Express backend to fly.io.

- See the deployed app [here](https://dronuts-dave.fly.dev/)

- To run the app locally:

  - Run `npm install` in both the root directory and the `/express` directory

  - Run `npm start` and then go to http://localhost:8080/

- To run the tests locally:

  - Run `npm test` from the `/express` directory

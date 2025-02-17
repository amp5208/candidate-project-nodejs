# ZOOM+Care Candidate Code Challenge - NodeJS API

![ZOOM+Care Logo](https://avatars0.githubusercontent.com/u/48925141?s=150)

[![Build Status](https://travis-ci.org/amp5208/candidate-project-nodejs.svg)](https://travis-ci.org/amp5208/candidate-project-nodejs)

Welcome to the ZOOM+Care NodeJS API Candidate Code Challenge. If you are here you most likely have interest in joining the ZOOM+Care Software Engineering Team and asked to choose one of our software development challenges. If you came here on your own, you are welcome to explore the challenge and use it to sharpen your skills or prepare for future interviews.

The ZOOM+Care Candidate Code Challenges are intended to take between 1 and 2 hours to complete. This is not intended to be an extensive test of your programing skills or knowledge, but rather as a starting point for further conversations during the application process.

## Instructions
This Candidate Code Challenge is geared toward developers with experience in JavaScript and NodeJS. The objective is to create an API that exposes several CRUD operations over HTTP for a predefined data schema. The data schema for this challenge is simple: A user (which is a writer) has posts, and each post has comments. Here are the basic requirements of the API:
* Create a user.
* Retrieve all comments associated with a user's post.
* Update a post.
* Delete a comment.
* Allow Cross-Origin Resource Sharing (CORS) from any domain.
* Provide simple validation and appropriate HTTP statuses in the response.
* When performing a mutation, ensure that all incoming requests for those routes contain an `authorization` header. The value of this header can be any non-empty string. If the request does not contain a header of `authorization`, respond with the appropriate HTTP status code.

## Project Dependencies and Structure
The HTTP server is created from [Express](https://expressjs.com/).

The database is handled via [LokiJS](http://lokijs.org), which is, to quote their website, "A fast, in-memory document-oriented datastore for node.js, browser and cordova". In `config/loki.js`, the database is initialized in memory and a method is provided for retrieving the database connection. You may implement the data access layer using any frameworks and architecture you would like.

This project was generated via the [Express Generator NPM dependency](https://expressjs.com/en/starter/generator.html). You can reorganize routes, controllers, etc. as you see fit.

## Developing
Ensure you have the latest LTS NodeJS and NPM versions installed. Preferred version is NodeJS v10.x and NPM v6.x.
```bash
# Install dependencies
npm install

# Install dependencies as identified by package lock, as would a CI server
npm ci --no-optional

# Run in development mode with `nodemon`
npm run dev

# Optionally, run directly with `node`
npm run start
```
Navigate to `localhost:3001` on your machine and the index page should be accessible. All API endpoints should also be accessible from this URL and port.

## Containerized Development
To ensure standardized development practices, we recommend building, developing, and running using the same approach that a CI server would perform:  Ephemeral containers.  We develop for this product using the [node:10 Docker image](https://hub.docker.com/_/node) Use the following commands to achieve this using Docker:

```bash
# Install dependencies
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) node:10 npm install

# Install dependencies as identified by package lock, as would a CI server
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) node:10 npm ci --no-optional

# Run in development mode with `nodemon`
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) -p 3001:3001 node:10 npm run dev

# Optionally, run directly with `node`
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) -p 3001:3001 node:10 npm run start
```

This will also allow your application instance to be available via port `3001`.  Alternatively, for ephemeral port mapping and discovery, simply leave off the left-half of the port option, e.g.: `-p :3001`.

## End-to-End Testing
This application is setup to test integrated functionality using [Cypress](https://www.cypress.io/).  To run tests using the exact configuration used by CI, use the following Docker command:

```bash
# Install testing dependencies
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) node:10 npm ci --no-optional

# Run app in test mode
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) --name zoomapp -p 3001:3001 node:10 npm run start

# Run test suite
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) --name cypresszoom --link zoomapp cypress/included:3.6.1
```

You can easily modify the base URL to be tested by adjusting the `./cypress.json` configuration file.  The default is the static linked Docker container name subbed as the hostname.

_TODO_:  `--link` is deprecated in Docker, in favor of network creation.  However, this resolves issues that might exist if an engineer is using a VPN.  CI servers will likely auto-resolve this using their in-built container service discovery and node workers.

To run within the context of the CI server, we recommend running within the maintained/approved Cypress inclusive Docker image:

```bash
docker run -it --rm -v $(pwd):$(pwd) -w $(pwd) --entrypoint="npm" cypress/included:3.6.1 run test:e2e
```

_Please note_: Running in this way is faster and simpler than the earlier, but it can yield unexpected behavior, given that Cypress now only supports Docker images including NodeJS v12+.  The application is set to otherwise be built/deployed using NodeJS v10.X.

## Data Schema Reference
Here are some simple examples of the three data types used in this project. You can see the full data in the `data` folder.  
**User**
```json5
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phoneNumbers": ["1-770-736-8031 x56442", "1-771-736-8032"],
  "website": "hildegard.org"
}
```
**Post**
```json5
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```
**Comment**
```json5
{
  "postId": 1,
  "id": 1,
  "name": "id labore ex et quam laborum",
  "email": "Eliseo@gardner.biz",
  "body": "laudantium enim quasi est quidem magnam voluptate ipsam \n skdfjb"
}
```

## Steps to Complete
* Create a Fork of the repository into your personal GitHub space.
* Implement the API requirements as described above.
* Create a Pull Request back to the original project.

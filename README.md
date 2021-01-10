# newsapp
Newsapp is an service to pull newes from newsapi and store in mysql database, it interacts with API
in every 10 minutes to pull latest neews based on filters

This app has used following techs:

- [ES6](http://babeljs.io/learn-es2015/) features/modules
- [Knex](http://knexjs.org/) migrations
- MySQL
- NewsAPI API [documentation](https://newsapi.org/docs/v2-migration)
- [ESLint](http://eslint.org/) for code linting
- Code formatting using [Prettier](https://www.npmjs.com/package/prettier)
- Configuration management using [dotenv](https://www.npmjs.com/package/dotenv)
- Logging using [winston](https://www.npmjs.com/package/winston)
- VS Code

---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [MySQL](https://www.mysql.com/downloads/)

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone 
    $ cd <application-name>
    $ yarn   # or npm install

Copy `.env.example` as `.env` and update the application details and database credentials.
After that run the migrations

    $ yarn migrate

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)


Navigate to http://localhost:3000/api/status to check if server is up.
Update these lines in your `.env` file.

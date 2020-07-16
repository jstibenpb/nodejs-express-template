# Node.JS Express template

The idea with this small and simple project is to show and explain how a scalable template could be built using an MVC architectural pattern and a style guide, the last one pretend to enforce good practices. This is so important because at the beginning a developer often starts coding just with the goal to make the code work but this is not enough, it is important that developers could understand what they are doing and how they could create code more scalable and sustainable without falling in bad practices or implementations

## Objectives

- Build a simple Node.js server by using __express__
- Configure some tools to enhance our way to develop (__Nodemon__, __ESLint__, __Prettier__, __Lint-staged__, __Husky__)
- Show and briefly explain a possible template to start building amazing apps using __express__
- Create middlewares to validate user authorizations, Joi schemas and get relevant Geo ip data

## Concepts

Before starting, let's define some important concepts, tools and dependencies which will be needed to be familiar with

### Node.js

It’s a JavaScript runtime built on Chrome's V8 JavaScript engine. The Node.js run-time environment includes everything you need to execute a program written in JavaScript. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, which allows Node.js to be very performant. **Node.js is not a language, it is a runtime**

### npm (Node package manager)

It provides a set of packages that developers can use in their apps to make the development faster and efficient. Those libraries were previously built by the community, in fact it’s possible to create own modules

### MVC pattern

The Model View Controller is a very used architectural pattern that tries to separates an application in three well-defined different parts. The **Model** is in charge of all data-related logic that the application interacts with. The **View** module is related to the UI logic and the **Controller** is a set of components that are able to process all the business logic and incoming requests manipulating the data from the Model. The main idea is that the Controller is like the core. It receives the data from the Model, process it and then the data is sent to the View. View should not able to interact with the Model

### Visual Studio Code

It is a free source-code editor cross-platform with support for hundreds of languages. It contains a lot of useful extensions to ease coding

### express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### bodyParser

It is a body parsing middleware that extracts the entire body of an incoming request and exposes it on __req.body__ property

### @hapi/joi

It is a powerful schema description language and data validator for JavaScript

### mongoose

It is Object Data Modelling dependency to connect a MongoDB database to Node.js. It allows data relationships, schema validation and translation between data types in code with their representation in MongoDB

## Create a server

Let's start creating a folder that will contain the project

```bash
  mkdir nodejs-express-template
  cd nodejs-express-template
```

Then, it is needed to set up the application as follows

```bash
  npm init
```

Default configurations works properly for this case, so just press **enter** in all questions. The project has been set, but there is not still any installed dependency. Let's install the main one, __express__

```bash
  npm install express
```

Let's create a file called __index.js__ in the root of the project and add the next configuration

```javascript
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});
```

What has it been done? __express__ was used to create a Node.js server and it will be listening on port 5000 if there is no any environment variable called __PORT__ set to other value

To initialize it

```bash
  node index.js
```

Now, the server is created and running, this is just the first step to make an amazing app, step by step a great project will be built

First goal has been achieved. Let's configure some tools to improve coding and enforce good practices

## Enhance coding

### nodemon

The first tool is called **nodemon**, basically this dependency helps to restart a Node.js application automatically each time a change is saved. It allows not to lose time stopping and starting the app everything there is someting new

It is recommended to install this dependency as global because it will not be used in only this app

```bash
  npm install nodemon -g
```

To use it, instead of using __node index.js__, the server needs to be run as follows

```bash
  nodemon index.js
```

To prove whether or not it is working, just make a change in file __index.js__ and save it. The server had to be restarted

**Note:** __nodemon__ works properly in almost all occasions with the exception if a changed is made in a file __.env__. In this case, the restarting must be done manually

#### Tip

There is a way to create a custom script in file __package.json__ to shorten and make it more understandable. In the case of __nodemon__ there is not a enormous difference but it will be valuable later

The point is to use a custom command

```bash
  npm run dev
```

instead of it

```bash
  nodemon index.js
```

__dev__ will be a word to identify when the app is running in a development scenario, that's why it often needs to be restarted. To achieve it, __scripts__ object of the file __package.json__ needs to be modified as follows

```javascript
  "scripts": {
    /// ...
    "dev": "nodemon index.js",
    /// ...
  }
```

After that, execute

```bash
  npm run dev
```

The app will start running in a __dev__ scenario

See more:
[nodemon](https://www.npmjs.com/package/nodemon)

### ESLint

A linter is a tool that analyzes code looking for programmatic and stylistic errors, the main goal to use it is to make the code more consistent and to avoid bugs. In that way, ESLint in a powerful linter to use in most of the cases

#### Installation

Let's start installing the ESLint extension that VS code provides

- Click in the extensions menu (left lateral menu)
- Search "__ESLint__"
- Click on "__install__"

Once the previous process has finished, let's install the package __ESLint__ via **npm** as a global scope

```bash
  npm install eslint -g
```

The package is ready, time to configure it executing the next command in the terminal

```bash
  eslint --init
```

A short questionarie will start, there are a lot of different possible configuration, it is up to the developer. Let's see one of those

The first question is related to how ESLint will be used, the idea is to be able to check syntax, find problems and enforce code style using a famous and useful style guide

![ESLint1](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_001.png)

In the current project, babel will not be used (Mainly used in React, Vue, ...), select "__CommonJS__"

![ESLint2](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_002.png)

According to the previous answer, the shown frameworks will not be used

![ESLint3](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_003.png)

Neither TypeScript will be used

![ESLint4](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_004.png)

"__Node__" is the option to run the code

![ESLint5](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_005.png)

As it was mentioned previously, the focus is to use a popular style guide

![ESLint6](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_006.png)

There are different kind of style guides, it is not easy to say which one it is better than the others. The selection for this question is the one from __Airbnb__

![ESLint7](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_007.png)

There are different formats to create the configuration file, one of the most used is as a **JSON**

![ESLint8](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_008.png)

Finally, it is time to install the required dependencies via **npm**

![ESLint9](https://storage.googleapis.com/project_pictures/nodeJS-express-template/ESLint/eslint_009.png)

After that, a new file called __.eslintrc.json__ will be created. This file stores all the configuration that has been just set

Time to make a check

```bash
  eslint .
```

The terminal console will show all errors and warnings that has been detected in the project, the next command must be run in order to correct them

```bash
  eslint . --fix
```

__Note__: In some occasions, everything will not be fixed, these errors or warning must be checked manually but the good thing is that they are alredy in the radar

As it was mentioned, there is a more elegant, short and better way to execute these tools. Let's create two more scripts

```javascript
{
  /// ...
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  /// ...
}
```

First command will log all errors and warnings; whilst the second one will try to correct all possible issues. The new commands will be

```bash
  npm run lint
```

or

```bash
  npm run lint:fix
```

__ESLint__ helps to increase productivity and write code according to a well-defined standard maintaining consistency and saving valuable time

See more:
[ESLint](https://www.npmjs.com/package/eslint)

### Prettier

As it was seen previously, __ESLint__ analyzes code looking for errors what can help to avoid bugs and stylistic issues. In the other hand, **Prettier** is an opinionated code formatter that will help to never worry about code formatting again, it follows a set of rules according to some stilystic requirements

**Prettier** is a complement of **ESLint**, they work together properly. So, do not worry about style any more and receive some help using these tools

Let's integrate them. First step is to disable formatting rules (from **ESLint**) that may cause conflicts with **Prettier**

```bash
  npm install --save-dev eslint-config-prettier
```

And then, add next line inside __.eslintrc.json__

```javascript
  /// ...
  {
    "extends": ["prettier"]
  },
  /// ...
```

After that, let's configure **ESLint** to run together with **Prettier**

```bash
  npm install --save-dev eslint-plugin-prettier prettier-eslint-cli prettier
```

And, modify file __.eslintrc.json__ with these news lines

```javascript
  /// ...
  {
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }
```

File __.eslintrc.json__ should look like

```javascript
  {
    "env": {
      "commonjs": true,
      "es6": true,
      "node": true
    },
    "extends": [
      "airbnb-base",
      "prettier"
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaVersion": 11
    },
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
  }
```

Both tools are now configured to run together, but there is no a specific set of rules for **Prettier** yet. To do so, it is needed to create a new file called __.prettierrc.json__ and add the next configuration

```javascript
  {
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true,
    "bracketSpacing": true,
    "arrowParens": "always"
  }
```

Briefly, this is what they mean

- __"trailingComma": "es5"__: Print trailing commas wherever possible (objects, arrays, etc.)

- __"tabWidth": 2__: Specify the number of spaces per indentation-level

- __"semi": true__: Add a semicolon at the end of every statement

- __"singleQuote": true__: Use single quotes instead of double quotes

- __"bracketSpacing": true__: Print spaces between brackets in object literals

- __"arrowParens": "always"__: Include parentheses around a sole arrow function parameter

There are a lot of more options to add, they could be found in [Prettier](https://prettier.io/docs/en/configuration.html)

Last step is to create two new custom scripts to execute the tool as follows

```javascript
  {
    /// ...
    "format": "prettier-eslint \"$PWD/{,!(node_modules)/**/}*.{js,json}\"",
    "format:fix": "prettier-eslint --write \"$PWD/{,!(node_modules)/**/}*.{js,json}\"",
    /// ...
  }
```

Where:

- __{,!(node_modules)/**/}__: Target all files in all directories except in node_modules

- __*.{js,json}__: Target just files with extension js or json

- __--write__: modify the target files, otherwise there will be only a log output in the terminal

Now, either __npm run format__ or __npm run format:fix__ could be executed to print or fix the bad issues

See more:
[Prettier](https://prettier.io/docs/en/)

### Git hooks

There is something very interesting called __Git hooks__, basically they are scripts that are executed automatically before or after to git events as: __commit__, __push__, ...

As it could be known, there are frequently several users working in the same repository what it may generate a chaotic situation with those different coding style. **ESLint** and **Prettier** help to maintain the code in good conditions. In addition, a script can be run before a commit to inspect the code condition to be sure everything is working and containing coding standards. This action is knows as a **pre-commit**

Two new dependencies need to be installed as follows

```bash
  npm install --save-dev husky lint-staged
```

- __lint-staged__: Run linters against staged git files

- __husky__: can prevent bad git commit, git push and more

Then, file __package.json__ needs to be modified adding these new lines

```javascript
  /// ...
  "lint-staged": {
    "*.js": [
      "npm run lint:fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  /// ...
```

File __package.json__ should look like

```javascript
  {
    "name": "nodejs-express-template",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "dev": "nodemon index.js",
      "lint": "eslint .",
      "lint:fix": "eslint . --fix",
      "format": "prettier-eslint \"$PWD/{,!(node_modules)/**/}*.{js,json}\"",
      "format:fix": "prettier-eslint --write \"$PWD/{,!(node_modules)/**/}*.{js,json}\"",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "lint-staged": {
      "*.js": [
        "npm run lint:fix",
        "git add"
      ]
    },
    "husky": {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1"
    },
    "devDependencies": {
      "eslint": "^6.8.0",
      "eslint-config-airbnb-base": "^14.1.0",
      "eslint-config-prettier": "^6.11.0",
      "eslint-plugin-import": "^2.20.2",
      "eslint-plugin-prettier": "^3.1.3",
      "husky": "^4.2.5",
      "lint-staged": "^10.2.9",
      "prettier": "^2.0.5",
      "prettier-eslint-cli": "^5.0.0"
    }
  }
```

The next time a change is going to be committed, the code will be inspected. If there is any error, the commit will not be completed until the issues are fixed

The second goal has been achieved. Now, there is a solid base to start building better applications

See more:
[Lint-staged](https://www.npmjs.com/package/lint-staged)
[Husky](https://www.npmjs.com/package/husky)

## Project structure

Building a scalable structure is a fundamental aspect to consider, updates or new features are definitely something that will not be missing in the development of an application. More and more code could generate managing problems. _"Where should this new feature be placed?"_, _"I do not understand how this API is connected with the other one"_. They are basically some things that must be avoided

In this sense, the following architecture is proposed. It tries to modularize the different components, it tries to split them in small pieces and then put together all elements to make them work in harmony

### What happens if something changes? (example: the database needs to be replaced)

As the project is split in several small pieces; if the database is going to be replaced, it will only be needed to change or modify the __Model__ layer which is in charge of the business data. It is not a big challenge compared to have a big piece in which everything is strongly linked. __Nice!!!__

```bash
nodeJS-express-template
|   .env
|   .eslintrc.json
|   .gitignore
|   .prettierrc.json
|   app.js
|   config.js
|   Dockerfile
|   index.js
|   package-lock.json
|   package.json
│   README.md
└───middlewares
    |   getData.js
    |   validateAuth.js
    |   validateSchemas.js
└───routes
    |   index.js
└───services
    |   mongoose.js
└───src
    └───users
        |   routes.js
        └───controller
            │   index.js
        └───models
            │   mongoose.js
        └───utils
            │   schemasValidation.js
```

Let's define them

- __.env__: File that contains environment variables. They can be loaded to the application by using the package _dotenv_. It is recommended to use this approach to avoid expond relevant information as credentials

- __.eslintrc.json__: __ESLint__ configuration

- __.gitignore__: File that contains ignored files in order to avoid pushing unnecessary files to the repository. In addition, it is important to ignore database keys or similar files

- __.prettierrc.json__: __Prettier__ configuration

- __app.js__: File that creates an express application and define some middlewares to customize the app

- __config.js__: File that contains project configurations as port listening and some default values for important variables

- __Dockerfile__: Set of commands needed to assemble an image

- __index.js__: Entry point of the application. The file defines the server configuration

- __package-lock.json__: Automatic generated file for any operation in which __npm__ modifies the project

- __package.json__: File that contains relevant data to the project as installed packages, configured tools, ...

- __middlewares__: Folder that contains relevant middlewares to use in the project

- __middlewares/getData__: Middleware in charge of extract information about the requests, for example: Geo IP data

- __middlewares/validateAuth__: Middleware in charge of validate the user authorization

- __middlewares/validateSchemas__: Middleware in charge of validate the input data by using a schema description language

- __routes/index.js__: File that summarizes all API paths in the project, in addition to middlewares. Specific paths will be define in each module of the application

- __services/mongoose.js__: Connection to the database, _Mongoose_ is used in this particular case. The connection is exported to make it accessible from the controller. If there are more connections, they must be created in different files in _services_

- __src__: Folder that contains the business and data logic for each module

- __users__: One module of the application

- __users/routes.js__: File that contains all paths for the module _users_

- __users/controller/index.js__: File that contains logic business for the module _users_. Basically, the set of functions that brings the APIs to life are defined and implemented here

- __users/models/mongoose.js__: File in which the _Mongoose_ models are defined assuming that _MongoDB_ is the database selected for the application

- __users/utils__: Additional resources that the module could need

- __users/utils/schemasValidation__: Schemas are defined to validate the input data according to some requirements the module could have

As it can be seen, the application is split in different pieces. Each module has its own models and controllers, everything is disengaged. It allows to have notion of the entire project, modify components in an easy and scalable way

In the branch __template__ there is an example of a basic API. It creates a new user and returns a valid token to make subsequent requests

### Assumptions

- A database is already created and ready to use (if not, check __MongoDB Atlas__, easy and fast way to run a database in the cloud)
- MongoDB url is loaded from a .env file
- JWT API key and expire time are load from a .env file

### Test it

After cloning the project is needed to install __ESLint__ and __nodemon__ globally and install others locally

```bash
  npm install nodemon -g
  npm install eslint -g
  npm i
```

Now, the application should be running and ready to test. One possible option to test it is with the help of _Postman_

- POST: __localhost:5000/users/api/v1/signup (see parameters in the schema of the model _users_)


## Next improvements

- Explanation about how the different created middlewares were configured and how they work
- APIs documentation using __Swagger__
- Default error handle
- Dynamic routes creation
- Deploy the Docker to GCP and AWS (CD)

## References

- [npm](https://www.npmjs.com/)
- [express](https://expressjs.com/)
- [prettier](https://github.com/prettier/prettier-eslint)
- [hapi/joi](https://hapi.dev/module/joi/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [express-ip](https://www.npmjs.com/package/express-ip)

## Contributing

Pull requests are so welcome. For major changes, please open an issue first to discuss what you would like to change

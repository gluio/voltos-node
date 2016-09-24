# Voltos

## Installation

## Usage

### Azure Hello World

Before you start, you'll need the [Azure CLI](https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/)
installed. Then make sure the config mode is to ASM and login:

```
$ azure config mode asm
$ azure login
```

Open the command-line terminal of your choice and install the
[Express generator for Yeoman](https://github.com/petecoop/generator-express),
and create a new Node.js app:

```
$ npm install -g yo generator-express
$ yo express
? Would you like to create a new directory for your project? Yes
? Enter directory name voltos-hello-world
? Select a version to install: MVC
? Select a view engine to use: Jade
? Select a css preprocessor to use (Sass Requires Ruby): None
? Select a database to use: None
? Select a build tool to use: Grunt
```

```
$ cd voltos-hello-world
$ azure site create --git
```

Edit `package.json` to specify a node version:

```json
  "engines": {
    "node": "6.6.0"
  }
```

Save and commit your changes, and then deploy your app:

```
$ git add .
$ git commit -m "Deploying new app to Azure."
$ git push azure master
```

#### Updating to use voltos

Edit `app/views/index.jade` to display some configurable output by changing the last
line to:


```jade
  p Welcome to #{process.env.SITE_NAME}
```

Update `package.json` to list `voltos` as a dependency:

```json
  "dependencies": {
    "voltos": "^0.0.14"
  }
```

Update `app.js`  and require `voltos` at the very top of the file:

```javascript
require('voltos')
```

Now create a new bundle for this app:

```
$ voltos create
```

Set the site name:

```
$ voltos set SITE_NAME="Hello world"
```

And then add a token for this bundle to the config of your Azure site:

```
$ % voltos token
Fetching token... ⣻

New API token for 'voltos-node-hello-world' is: cbad7be5112287c39dad41c643761a84
Please store this securely, this is the only time it will be displayed and it can not be retrieved again
(though you can request a new one)

$ azure site config add VOLTOS_KEY=cbad7be5112287c39dad41c643761a84
```

Now save and deploy your changes:

```
$ git commit -am "Update app to use voltos."
$ git push azure master
```


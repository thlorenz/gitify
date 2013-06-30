# gitify [![build status](https://secure.travis-ci.org/thlorenz/gitify.png)](http://travis-ci.org/thlorenz/gitify)

Tool to create a remote github repository and add and push content to it.

```js
var gitify = require('gitify');

// change username and password to match your github account to see it in action
gitify(
  { username: 'joe'
  , password: 'secret'
  , reponame: 'foo'   // if no reponame is given, the current folder name is used
  }
  , function (err) {
    if (err) return console.error('err: ', err);
    console.log('Success');
  }
);
```

## Installation

    npm install gitify

## API

###*gitify(opts : Object, cb : Function)*

- opts are optional and specify
    - username: github username
    - password: github password
    - reponame: name under which the repo should be published on github
    - description: description of the repository

## Commandline

    gitify [<reponame> <username> <password>]

## License

MIT

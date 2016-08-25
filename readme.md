# Simple Flags

The aim of this module is to facilitate the capture and manulação of badeiras on the command line. There are several modules that provide a similar result, but I chose to write this to create a simpler architecture for the configuration data.

## Installation
`npm install --save simple-args`

## Test
In node_modules/simple-args, run:

`npm run test`

#### option.args
Get the names of the arguments that are not pre-defined, ie its definition is from your order.

#### Booleans
All Boolean object to be declared as an argument will have its inverted default value if true is false, is false is true.

You can create aliases for an object. When the value is not pre defined, use `{objectName: ['a']}`, passing the alias in an array. When the value is definiod use `{alias: [ 'a', 'b'], value: "123"}`

## Example
### Code
```javascript
//test.js
var flags = require('simple-flags')

// Default options
var options = {
    "args": ["author", "website"],
    "coffee": false,
    "not": true,
    "developer": ['d', 'dev'],
    "country": {
        short: 'c',
        value: "Do not be 'reaça'"
    }
}

console.log(flags(options))

```

### Command
```shell
node test.js 'Philippe Assis' ${HOME} --site www.philippeassis.com --github=https://github.com/PhilippeAssis -d --coffee -not -c 'Brazil=Fora Temer'
```


### Result
```javascript
{ coffee: true,
  not: false,
  developer: true,
  country: 'Brazil=Fora Temer',
  site: 'www.philippeassis.com',
  github: 'https://github.com/PhilippeAssis',
  author: 'Philippe Assis',
  website: '/home/assis' }
  ```

# Simple Flags

The aim of this module is to facilitate the capture and manulação of badeiras on the command line. There are several modules that provide a similar result, but I chose to write this to create a simpler architecture for the configuration data.

## Installation
`npm install --save simple-args`

## Test
In node_modules/simple-args, run: `npm run test`

## Features

#### option.args
Get the names of the arguments that are not pre-defined, ie its definition is from your order.

#### Booleans
All Boolean object to be declared as an argument will have its inverted default value if true is false, is false is true.

You can create aliases for an object. When the value is not pre defined, use `{objectName: ['a']}`, passing the alias in an array. When the value is definiod use `{alias: [ 'a', 'b'], value: "123"}`

### Description
To describe the flags, just add **description**. When you run `--help` the full description of the schema will be displayed
```javascript
{
  print: {
    description: "Print all",
    default: true
  }
}
```

### Print description's, --help
By default the `--help` flag is available when no other arument is passed before it.

```bash
myapp --help
```
You can force the display of the description of the flags using [execute](#execute) and calling within it the function `this.help()`.

### Execute
You can execute functions directly when a flag is declared. If the function has a return other than `undefined` the value will be set for the parameter.

```javascript
const params = flags({
  print: {
    execute(){
      console.log(this.schema)
    }
  },
  support: {
    execute(){
      this.help() // print description's
    }
  },
  calc: {
    execute(){
      return 1 + 1 // params.calc === 2
    }
  }
})
```

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
    "developer": null,
    "country": {
        aliases: ['c', 'country'],
        default: "Do not be 'reaça'"
    }
}

console.log(flags(options))
```

### Command
```shell
node test.js 'Philippe Assis' ${HOME} --site www.philippeassis.com --github=https://github.com/PhilippeAssis -d --coffee -not -c 'Brazil=#foraTemer'
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

  ## Deprecation'
  ### alias to aliases
  The `alias` priority will be replaced for `aliases` in the future, necessarily passing an array

```javascript
"country": {
    aliases: ['c', 'country']
}
```
### value to default
The `value` priority will be replaced for `default` in the future

```javascript
"country": {
    default: "#foraTemer"
}
```

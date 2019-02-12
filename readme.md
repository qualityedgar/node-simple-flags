# Simple Flags

Modified version of <https://github.com/PhilippeAssis/node-simple-flags>. To have better help 
text and more options.

## Installation
`npm install --save @quality-edgar/simple-flags`

## Test
In node_modules/simple-args, run: `npm run test`

## Features

#### option.name
Program Name. Shows in help text

#### option.description
Program Description. Shows in help text

#### option.helpHeader
Header for auto generated help. 

#### option.synopsis
Synopsis auto generated help. An Array of strings containing sample commands.

#### option.flags
Flags to parse or generate help for.

#### Booleans
All Boolean object to be declared as an argument will have its inverted default value if true is false, is false is true.

You can create aliases for an object. When the value is not pre defined, use `{objectName: ['a']}`, passing the alias in an array. When the value is definiod use `{alias: [ 'a', 'b'], default: "123"}`

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
  flags : {
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
  'helpHeader' : "Usage Guide : \n",
  'args': ['author', 'website'],
  'name' : 'Program Name',
  'description' : 'Program Description',
  'synopsis' : ["prog --coffee --not","prog --developer='Sundeep Narang'"],
  'flags' : {
    'coffee': {
      default: false,
      description: 'You have coffee?'
    },
    'not': {
      default: true,
      description: 'Boolean example'
    },
    'developer': {
      aliases: ['dev', 'd'],
      description: 'Developer name'
    },
    'country': {
      aliases: ['c'],
      default: 'Do not be \'reaça\'',
      description: 'Your country'
    },
    'directFlag' : "test"
  }
}

console.log(flags(options))
```

### Command
```shell
node test.js 'Quality EDGAR' ${HOME} --site www.qualityedgarsolutions.com --github=https://github.com/qualityedgar -d --coffee -not -c 'USA=QES'
```

### Result
```javascript
{ coffee: true,
  not: true,
  country: 'USA=QES',
  directFlag: 'test',
  site: 'www.qualityedgarsolutions.com',
  github: 'https://github.com/qualityedgar',
  author: 'Quality EDGAR',
  website: '/Users/sundeepnarang',
  developer: true }
  ```

  ## Other Props
  ### aliases
  

```javascript
"country": {
    aliases: ['c', 'country']
}
```
### default

```javascript
"country": {
    default: "#foraTemer"
}
```
### hidden

```javascript
"hideFlagFromHelp": {
    hidden: true
}
```

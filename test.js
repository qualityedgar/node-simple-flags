var flags = require('./lib/simpleFlags');

// Default options
var options = {
  'helpHeader' : "Usage Guide : \n",
  'args': ['author', 'website'],
  'name' : 'Program Name',
  'version' : 'Program Version String',
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

console.log('Default options:')
console.log(options)

console.log('\nYou used: \n' + process.argv.slice(2).map(function (value) {
  return (value.search(/ /g) > -1) ? '"' + value + '"' : value
}).join(' ') + '\n')

console.log('Result:')
console.log(flags(options))

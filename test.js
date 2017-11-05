var flags = require('./lib/simpleFlags')

// Default options
var options = {
  'args': ['author', 'website'],
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
  }
}

console.log('Default options:')
console.log(options)

console.log('\nYou used: \n' + process.argv.slice(2).map(function (value) {
  return (value.search(/ /g) > -1) ? '"' + value + '"' : value
}).join(' ') + '\n')

console.log('Result:')
console.log(flags(options))

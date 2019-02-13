const help = require('./helperView')

function deprecationWarning (option) {
  if (option.alias) {
    console.warn('DeprecationWarning:', 'The "alias" privilege will be removed in the future, please use "aliases: [\'value\']"')
  }

  if (option.value) {
    console.warn('DeprecationWarning:', `The "value" privilege will be removed in the future, please use "default: ${option.value}"`)
  }
}

const simpleFlags = (ipOptions, argv) => {
  const {args,flags:schema,version="Not Specified"} = ipOptions;
  const options = Object.assign({}, schema);

  if (!argv) {
    argv = process.argv.slice(2)
  }

  if (['-h', '--help'].indexOf(argv[0]) > -1) {
    help(ipOptions);
    process.exit()
  }

  if (['-v', '--version'].indexOf(argv[0]) > -1) {
    console.log("Version :", version);
    process.exit()
  }

  const execs = {
    __total: 0
  }

  for (let i = 0; i < argv.length; i++) {
    // --example, --example value, --exemple=value, -e, -e value, -e=value

    if (argv[i].search(/(-|--)[A-z0-9]/g) === 0) {
      const prefix = (argv[i].indexOf('--') === 0) ? '--' : '-'
      var key = null

      // --example=value, -e=value
      if (argv[i].indexOf('=') > -1) {
        const value = argv[i].match(/=.*/)[0].substring(1)
        key = argv[i].replace('=' + value, '').replace(prefix, '')
        options[key] = value
        argv[i] = null
        continue
      }
      // --example, -e
      key = argv[i].replace(prefix, '')
      if (!argv[i + 1] || argv[i + 1].search(/(-|--)[A-z0-9]/g) === 0 || (options[key] && typeof options[key] === 'boolean')) {
        // { example: true}
        if (typeof options[key] === 'boolean') {
          options[key] = !options[key]
        } else if (typeof options[key] === 'object' && options[key].execute) {
          execs[key] = options[key].execute
          execs.__total += 1
        } else {
          options[key] = true
        }

        argv[i] = undefined
      } else {
        // --example value, -e value
        options[key] = argv[++i]
        argv[i] = undefined
        argv[i - 1] = undefined
      }
    }
  }

  // { args: ['example', 'other'] }
  if (args) {
    argv.filter(function (value) {
      return (value !== undefined)
    }).map(function (value, key) {
      if (args[key]) {
        options[args[key]] = value
      }
    })
  }

  delete options.args

  // alias, default
  for (let prop in options) {
    if (typeof options[prop] === 'object' && options[prop]) {
      deprecationWarning(options[prop])

      var aliases = options[prop].alias || options[prop].aliases || prop
      const defaultValue = options[prop].value || options[prop].default || undefined

      if (defaultValue === undefined) {
        delete options[prop]
      }

      if (!Array.isArray(aliases)) {
        aliases = [aliases]
      }

      for (let i = 0; i < aliases.length; i++) {
        let curAlias = aliases[i]

        if (options[curAlias]) {
          if (defaultValue && typeof options[prop] === 'boolean') {
            options[prop] = !defaultValue
          } else {
            options[prop] = options[curAlias]
          }

          delete options[curAlias]
        }
      }

      if (typeof options[prop] === 'object') {
        if (options[prop].default) {
          options[prop] = options[prop].default
        } else {
          options[prop] = undefined
        }
      }
    }
  }
  if (execs.__total > 0) {
    Object.keys(execs).filter(prop => prop !== '__total').map(prop => {
      let optReturn = execs[prop].call({
        schema,
        options,
        help: () => {
          help(schema)
          process.exit()
        }
      })

      if (optReturn !== undefined) {
        options[prop] = optReturn
      }
    })
  }

  return options
}

module.exports = simpleFlags

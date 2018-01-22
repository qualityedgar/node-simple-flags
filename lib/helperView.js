require('colors')

module.exports = (options) => {
  const eventName = process.argv.slice(1)[0]

  if (options.args) {
    var argsTxt = `<${options.args.join('>, <')}>`
    console.log(eventName, argsTxt)
  }

  console.log('\n')

  delete options.args

  for (let key in options) {
    if (typeof options[key] === 'object' && options[key].hidden) {
      continue
    }

    let alias = key + ':'

    if (typeof options[key] === 'object') {
      let aliasOpt = options[key].alias || options[key].aliases

      if (!Array.isArray(aliasOpt)) {
        aliasOpt = [aliasOpt]
      }

      if (aliasOpt) {
        alias += ` [${key}, -${key}, --${key}`
        alias += ', -' + aliasOpt.join(', -')
        alias += ', -' + aliasOpt.join(', --')
        alias += ']'
      }

      const description = options[key].description || ''

      console.log(alias, '|', description)
    } else {
      console.log(`--${key}`, '')
    }
  }
}

require('colors');

module.exports = (options) => {

  const {args=[], helpHeader="",flags={},name=false,description=false,synopsis=[]} = options;

  console.log(helpHeader);

  if(name){
    console.log("NAME\n");
    console.log(`\t${name}\n`)
  }

  if(synopsis.length){
    console.log("SYNOPSIS\n");
    console.log(`\t${synopsis.join("\n\t")}\n`)
  }

  console.log("DESCRIPTION\n");
  if(description) {
    console.log("\t"+description+"\n");
  }

  if (args.length) {
    const argsTxt = `<${args.join('>, <')}>`;
    console.log("\tARGS\n");
    console.log("\t"+argsTxt+"\n");
  }
  console.log('\tFLAGS\n');

  for (let key in flags) {

    if (typeof flags[key] === 'object' && flags[key].hidden) {
      continue
    }

    let alias = `\t-${key}`;

    if (typeof flags[key] !== 'object') {
      let defVal = flags[key];
      flags[key] = {
        "default" : defVal
      };
    }

    const {default:defaultVal} =  flags[key];
    if(typeof defaultVal === "boolean"){
      alias += "\n\t\t";
    } else {
      alias += " {value}\n\t\t";
    }
    alias += `ALIASES: [-${key}, --${key}`;

    let aliasOpt = flags[key].aliases;
    if (aliasOpt && !Array.isArray(aliasOpt)) {
      aliasOpt = [aliasOpt]
    }
    if (aliasOpt) {

      alias += ', -' + aliasOpt.join(', -');
      alias += ', --' + aliasOpt.join(', --');
    }
    alias += ']';

    const description = flags[key].description || '';

    console.log(alias);

    if(typeof defaultVal !== "undefined") {
      console.log(`\t\tDEFAULT: '${defaultVal}'`);
    }

    if(description) {
      console.log("\t\tDESCRIPTION: ", description, "\n");
    } else {
      console.log("")
    }

  }
};

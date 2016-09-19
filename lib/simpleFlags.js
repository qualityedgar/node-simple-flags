var simpleFlags = function(options, argv) {
    if (!argv) {
        var argv = process.argv.slice(2);
    }

    for (var i = 0; i < argv.length; i++) {
        // --example, --example value, --exemple=value, -e, -e value, -e=value

        if (argv[i].search(/(-|--)[A-z0-9]/g) == 0) {
            var prefix = (argv[i].indexOf("--") == 0) ? '--' : '-';

            if (argv[i].indexOf("=") > -1) {
                var value = argv[i].match(/=.*/)[0].substring(1);
                var key = argv[i].replace('=' + value, '').replace(prefix, '')
                options[key] = value;
                argv[i] = null;
                continue;
            }

            var key = argv[i].replace(prefix, '')

            if (!argv[i + 1] || argv[i + 1].search(/(-|--)[A-z0-9]/g) == 0 || (options[key] && typeof options[key] == "boolean")) {
                if (typeof options[key] == 'boolean') {
                    options[key] = !options[key];
                } else {
                    options[key] = true;
                }
                argv[i] = undefined;
            } else {
                options[key] = argv[++i]
                argv[i] = undefined;
                argv[i - 1] = undefined;
            }
        }
    }

    argv.filter(function(value) {
        return (value != undefined)
    }).map(function(value, key) {
        if (options.args[key]) {
            options[options.args[key]] = value;
        }
    })

    delete options.args;

    //alias
    for (var i in options) {
        if (typeof options[i] == 'object') {
            var alias = options[i].alias || options[i];
            var itemValue = options[i].value || undefined

            if(itemValue == undefined){
              delete options[i];
            }

            if (typeof alias != "object") {
                var alias = [alias];
            }

            for (var e in alias) {
                if (options[alias[e]]) {
                    if (itemValue && typeof options[i] == "boolean") {
                        options[i] = !itemValue;
                    } else {
                        options[i] = options[alias[e]];
                    }

                    delete options[alias[e]];
                }
            }
        }
    }

    return options;
}

module.exports = simpleFlags;

['progn', ['progn', ['lispMode'], ['tridentMode'], ['stealSlimeKeysForTridentbang']], ['progn', ['setq', 'httpdPort', 8081], ['httpdServeDirectory', ['format', '%sdocs/', 'defaultDirectory']], ['browseUrl', ['format', 'http://127.0.0.1:%d/index.html', 'httpdPort']]]];
['quickload', 'parenscript'];
['progn', ['import', ['quote', 'var']], ['shadow', ['quote', 'var']], ['usePackage', 'parenscript'], ['defpsmacro', 'defparameter', ['&body', 'body'], ['quasiquote', ['defvar', null]]], ['defpsmacro', 'defmake', ['name'], ['quasiquote', ['defmacro', null, ['&rest', 'props'], ['quasiquote', ['create', null]]]]], ['defpsmacro', 'defineAccessor', ['structName', 'slotName'], ['quasiquote', ['defmacro', null, ['obj'], ['quasiquote', ['getprop', null, null]]]]], ['definePsSymbolMacro', 'cons', 'list'], ['defpsmacro', 'cons', ['&rest', 'args'], ['quasiquote', ['list', null]]], ['defpsmacro', 'defstruct', ['structName', '&rest', 'slots'], ['quasiquote', ['progn', ['defmake', null], null]]], ['defpsmacro', 'gethash', ['key', 'obj'], ['quasiquote', ['getprop', null, null]]], ['defpsmacro', 'nth', ['n', 'list'], ['quasiquote', ['getprop', null, null]]]];
[['at', 'location', 'reload']];
function optimism(animal) {
    return _.sum(animal.genes.slice(0, 3));
};
function pessimism(animal) {
    return _.sum(animal.genes.slice(3));
};
function plus() {
    var args = Array.prototype.slice.call(arguments, 0);
    return _.sum(args);
};
lodashSubs = [['car', 'head'], ['cdr', 'tail'], ['copyStructure', 'cloneDeep'], ['copyList', 'cloneDeep']];
lodashFlipSubs = [['some', 'find'], ['removeIf', 'reject'], ['mapc', 'map']];
(function () {
    var _js26 = lodashSubs.length;
    for (var _js25 = 0; _js25 < _js26; _js25 += 1) {
        var _db27 = lodashSubs[_js25];
        var local = _db27[0];
        var remote = _db27[1];
        this[local] = _[remote];
    };
}).call(this);
(function () {
    var _js28 = lodashFlipSubs.length;
    for (var _js27 = 0; _js27 < _js28; _js27 += 1) {
        var _db29 = lodashFlipSubs[_js27];
        var local = _db29[0];
        var remote = _db29[1];
        this[local] = _.flip(_[remote]);
    };
}).call(this);
function lg() {
    var args = Array.prototype.slice.call(arguments, 0);
    return console.log.apply(console, args);
};
lg('Trident is working as expected');
parseInteger = Number.parseInt;
function equal(l, r) {
    return l == r;
};
function makeHashTable() {
    var _js30 = arguments.length;
    for (var n29 = 0; n29 < _js30; n29 += 2) {
        switch (arguments[n29]) {
        case 'test':
            test = arguments[n29 + 1];
        };
    };
    var test;
    return {  };
};
function remhash(key, hashTable) {
    return delete hashTable[key];
};
function zerop(value) {
    return value == 0;
};
function push(value, list) {
    return list.push(value);
};
princBuffer = '';
function freshLine() {
    return princBuffer && princ('\n');
};
function princ(string) {
    return princBuffer += string;
};
TEMPREADLINEVALUE = 1;
READLINE = 'quit';
function readLine() {
    var value = TEMPREADLINEVALUE || 'quit';
    TEMPREADLINEVALUE = null;
    return value;
};
function charFor(animal) {
    var animalTotal = _.sum(animal.genes);
    var animalAbsoluteOptimism = optimism(animal);
    var animalOptimism = animalAbsoluteOptimism / animalTotal;
    if (animalOptimism <= 0.2) {
        return 'X';
    } else if (animalOptimism <= 0.4) {
        return 'x';
    } else if (animalOptimism <= 0.6) {
        return 'o';
    } else if (animalOptimism <= 0.8) {
        return '^';
    } else if (animalOptimism <= 1.0) {
        return 'A';
    };
};
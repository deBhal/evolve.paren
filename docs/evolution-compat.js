['progn', ['progn', ['lispMode'], ['tridentMode'], ['stealSlimeKeysForTridentbang']], ['progn', ['setq', 'httpdPort', 8081], ['httpdServeDirectory', ['format', '%sdocs/', 'defaultDirectory']], ['browseUrl', ['format', 'http://127.0.0.1:%d/index.html', 'httpdPort']]]];
['quickload', 'parenscript'];
['progn', ['import', ['quote', 'var']], ['shadow', ['quote', 'var']], ['usePackage', 'parenscript'], ['defpsmacro', 'defparameter', ['&body', 'body'], ['quasiquote', ['defvar', null]]], ['defpsmacro', 'defmake', ['name'], ['quasiquote', ['defmacro', null, ['&rest', 'props'], ['quasiquote', ['create', null]]]]], ['defpsmacro', 'defineAccessor', ['structName', 'slotName'], ['quasiquote', ['defmacro', null, ['obj'], ['quasiquote', ['getprop', null, null]]]]], ['definePsSymbolMacro', 'cons', 'list'], ['defpsmacro', 'cons', ['&rest', 'args'], ['quasiquote', ['list', null]]], ['defpsmacro', 'defstruct', ['structName', '&rest', 'slots'], ['quasiquote', ['progn', ['defmake', null], null]]], ['defpsmacro', 'gethash', ['key', 'obj'], ['quasiquote', ['getprop', null, null]]], ['defpsmacro', 'nth', ['n', 'list'], ['quasiquote', ['getprop', null, null]]]];
[['at', 'location', 'reload']];
function optimism(animal) {
    var genes8 = animal.genes;
    return _.last(genes8) + _.sum(genes8.slice(0, 2));
};
function pessimism(animal) {
    return _.sum(animal.genes.slice(2, -1));
};
function plus() {
    var args = Array.prototype.slice.call(arguments, 0);
    return _.sum(args);
};
lodashSubs = [['car', 'head'], ['cdr', 'tail'], ['copyStructure', 'cloneDeep'], ['copyList', 'cloneDeep']];
lodashFlipSubs = [['some', 'find'], ['removeIf', 'reject'], ['mapc', 'map']];
(function () {
    var _js10 = lodashSubs.length;
    for (var _js9 = 0; _js9 < _js10; _js9 += 1) {
        var _db11 = lodashSubs[_js9];
        var local = _db11[0];
        var remote = _db11[1];
        this[local] = _[remote];
    };
}).call(this);
(function () {
    var _js12 = lodashFlipSubs.length;
    for (var _js11 = 0; _js11 < _js12; _js11 += 1) {
        var _db13 = lodashFlipSubs[_js11];
        var local = _db13[0];
        var remote = _db13[1];
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
    var _js14 = arguments.length;
    for (var n13 = 0; n13 < _js14; n13 += 2) {
        switch (arguments[n13]) {
        case 'test':
            test = arguments[n13 + 1];
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
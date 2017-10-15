['progn', ['progn', ['lispMode'], ['tridentMode'], ['stealSlimeKeysForTridentbang']], ['progn', ['setq', 'httpdPort', 8081], ['httpdServeDirectory', ['format', '%s/', 'defaultDirectory']], ['browseUrl', ['format', 'http://127.0.0.1:%d/evolve.html', 'httpdPort']]]];
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
lodashFlipSubs = [['some', 'some'], ['removeIf', 'reject'], ['mapc', 'map']];
(function () {
    var _js2 = lodashSubs.length;
    for (var _js1 = 0; _js1 < _js2; _js1 += 1) {
        var _db3 = lodashSubs[_js1];
        var local = _db3[0];
        var remote = _db3[1];
        this[local] = _[remote];
    };
}).call(this);
(function () {
    var _js4 = lodashFlipSubs.length;
    for (var _js3 = 0; _js3 < _js4; _js3 += 1) {
        var _db5 = lodashFlipSubs[_js3];
        var local = _db5[0];
        var remote = _db5[1];
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
    var _js6 = arguments.length;
    for (var n5 = 0; n5 < _js6; n5 += 2) {
        switch (arguments[n5]) {
        case 'test':
            test = arguments[n5 + 1];
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
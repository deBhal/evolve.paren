['progn', ['lispMode'], ['tridentMode'], ['stealSlimeKeysForTridentbang']];
[['getprop', 'console', ['quote', 'log']], 'Trident is working as expected in evolution-browser.paren'];
WORLDAGE = 0;
worldElement = document['getElementById']('world');
worldAgeElement = document['getElementById']('world-age');
runButton = document['getElementById']('run');
pauseButton = document['getElementById']('pause');
stepButton = document['getElementById']('step');
worldElement.rows = 1 + HEIGHT;
worldElement.cols = 2 + WIDTH;
function drawWorldBrowser() {
    princBuffer = '';
    drawWorld();
    worldElement.value = princBuffer;
    return null;
};
function enter(n) {
    RUNNING = WORLDAGE + n;
    return runningStep();
};
function updateWorldBrowser() {
    updateWorld();
    return incrementWorldAge();
};
function step(draw) {
    if (draw === undefined) {
        draw = true;
    };
    updateWorldBrowser();
    incrementWorldAge();
    draw && drawWorldBrowser();
    return freshLine();
};
RUNNING = null;
function run(steps) {
    if (steps === undefined) {
        steps = Infinity;
    };
    RUNNING = WORLDAGE + steps;
    return runningStep();
};
WORLDRENDERPERIOD = 10000;
WORLDAGERENDERPERIOD = 100;
function runningStep() {
    var finished = WORLDAGE >= RUNNING;
    var shouldDrawWorld = finished || 0 === (WORLDAGE % WORLDRENDERPERIOD + WORLDRENDERPERIOD) % WORLDRENDERPERIOD;
    var shouldDrawWorldAge = finished || 0 === (WORLDAGE % WORLDAGERENDERPERIOD + WORLDAGERENDERPERIOD) % WORLDAGERENDERPERIOD;
    var drawingSomething = shouldDrawWorld || shouldDrawWorldAge;
    finished || updateWorldBrowser();
    shouldDrawWorld && drawWorldBrowser();
    shouldDrawWorldAge && drawWorldAge();
    return finished || (drawingSomething ? setTimeout(runningStep) : runningStep());
};
function stop() {
    return RUNNING = null;
};
function drawWorldAge(age) {
    if (age === undefined) {
        age = WORLDAGE;
    };
    return worldAgeElement && (worldAgeElement['innerText'] = age);
};
function incrementWorldAge() {
    ++WORLDAGE;
    return drawWorldAge();
};
function getElementById(id) {
    return document['getElementById'](id);
};
runForInputElement = getElementById('run-for-input');
function runForInputValue() {
    return run(Number(runForInputElement.value));
};
function assignOnClick(buttonId, callback) {
    return document['getElementById'](buttonId)['onclick'] = callback;
};
assignOnClick('run', run);
assignOnClick('stop', stop);
assignOnClick('step', step);
assignOnClick('run-for', runForInputValue);
function scopeStateName(name) {
    return 'evolve:' + name;
};
function saveItem(name, value) {
    localStorage['setItem'](scopeStateName(name), JSON.stringify(value));
    return value;
};
function loadItem(name) {
    return JSON.parse(localStorage[scopeStateName(name)]);
};
function createCurrentStateObject() {
    return { worldAge : WORLDAGE,
             animals : ANIMALS,
             plants : PLANTS
           };
};
function saveState(name) {
    if (name === undefined) {
        name = 'state';
    };
    return saveItem(name, createCurrentStateObject());
};
function loadState(name) {
    if (name === undefined) {
        name = 'state';
    };
    var currentState = loadItem(name);
    WORLDAGE = currentState.worldAge;
    ANIMALS = currentState.animals;
    PLANTS = currentState.plants;
    drawWorldBrowser();
    drawWorldAge();
    return currentState;
};
drawWorldBrowser();
enter(1);
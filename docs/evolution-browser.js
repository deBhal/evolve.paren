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
    RUNNING = null;
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
function runningStep(worldRenderPeriod, worldAgeRenderPeriod) {
    if (worldRenderPeriod === undefined) {
        worldRenderPeriod = WORLDRENDERPERIOD;
    };
    if (worldAgeRenderPeriod === undefined) {
        worldAgeRenderPeriod = WORLDAGERENDERPERIOD;
    };
    var finished = WORLDAGE >= RUNNING;
    var shouldDrawWorld = finished || 0 === (WORLDAGE % worldRenderPeriod + worldRenderPeriod) % worldRenderPeriod;
    var shouldDrawWorldAge = finished || 0 === (WORLDAGE % worldAgeRenderPeriod + worldAgeRenderPeriod) % worldAgeRenderPeriod;
    var drawingSomething = shouldDrawWorld || shouldDrawWorldAge;
    finished || updateWorldBrowser();
    shouldDrawWorld && drawWorldBrowser();
    shouldDrawWorldAge && drawWorldAge();
    return finished || (drawingSomething ? setTimeout(function () {
        return runningStep(worldRenderPeriod, worldAgeRenderPeriod);
    }) : runningStep(worldRenderPeriod, worldAgeRenderPeriod));
};
function play(steps) {
    if (steps === undefined) {
        steps = Infinity;
    };
    RUNNING = WORLDAGE + steps;
    return runningStep(1, 1);
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
function getElementById(id) {
    return document['getElementById'](id);
};
runForInputElement = getElementById('run-for-input');
function runForInputValue() {
    return run(Number(runForInputElement.value));
};
function playForInputValue() {
    return play(Number(runForInputElement.value));
};
function assignOnClick(buttonId, callback) {
    return document['getElementById'](buttonId)['onclick'] = callback;
};
assignOnClick('play', play);
assignOnClick('fast-forward', run);
assignOnClick('stop', stop);
assignOnClick('step', playForInputValue);
assignOnClick('run-for', runForInputValue);
drawWorldBrowser();
enter(1);
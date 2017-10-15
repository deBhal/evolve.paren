var WIDTH = 100;
var HEIGHT = 30;
var JUNGLE = [45, 10, 10, 10];
var PLANTENERGY = 80;
var PLANTS = makeHashTable('test', equal);
function randomPlant(left, top, width, height) {
    var pos = [left + Math.floor(width * Math.random()), top + Math.floor(height * Math.random())];
    return PLANTS[pos] = true;
};
function addPlants() {
    randomPlant.apply(this, JUNGLE);
    return randomPlant(0, 0, WIDTH, HEIGHT);
};
var ANIMALS = [{ 'x' : WIDTH >> 1,
                 'y' : HEIGHT >> 1,
                 'energy' : 1000,
                 'dir' : 0,
                 'genes' : (function () {
    var collect8 = [];
    for (var _js7 = 0; _js7 < 8; _js7 += 1) {
        collect8.push(Math.floor(10 * Math.random()) + 1);
    };
    return collect8;
})()
               }];
function move(animal) {
    var dir = animal['dir'];
    var x = animal['x'];
    var y = animal['y'];
    animal['x'] = ((x + (dir >= 2 && dir < 5 ? 1 : (dir === 1 || dir === 5 ? 0 : -1)) + WIDTH) % WIDTH + WIDTH) % WIDTH;
    animal['y'] = ((y + (dir >= 0 && dir < 3 ? -1 : (dir >= 4 && dir < 7 ? 1 : 0)) + HEIGHT) % HEIGHT + HEIGHT) % HEIGHT;
    return --animal['energy'];
};
function turn(animal) {
    var x = Math.floor(plus.apply(this, animal['genes']) * Math.random());
    var angle = function (genes, x) {
        var xnu = x - car(genes);
        return xnu < 0 ? 0 : angle(cdr(genes), xnu) + 1;
    };
    return animal['dir'] = ((animal['dir'] + angle(animal['genes'], x)) % 8 + 8) % 8;
};
function eat(animal) {
    var pos = [animal['x'], animal['y']];
    if (PLANTS[pos]) {
        animal['energy'] += PLANTENERGY;
        return remhash(pos, PLANTS);
    };
};
var REPRODUCTIONENERGY = 200;
function reproduce(animal) {
    var e = animal['energy'];
    if (e >= REPRODUCTIONENERGY) {
        animal['energy'] = e >> 1;
        var animalNu = copyStructure(animal);
        var genes = copyList(animal['genes']);
        var mutation = Math.floor(8 * Math.random());
        genes[mutation] = Math.max(1, genes[mutation] + Math.floor(3 * Math.random()) + -1);
        animalNu['genes'] = genes;
        return push(animalNu, ANIMALS);
    };
};
function updateWorld() {
    ANIMALS = removeIf(function (animal) {
        return animal['energy'] <= 0;
    }, ANIMALS);
    mapc(function (animal) {
        turn(animal);
        move(animal);
        eat(animal);
        return reproduce(animal);
    }, ANIMALS);
    return addPlants();
};
function drawWorld() {
    for (var y = 0; y < HEIGHT; y += 1) {
        freshLine();
        princ('|');
        for (var x = 0; x < WIDTH; x += 1) {
            with ({ x : x }) {
                princ(some(function (animal) {
                    return animal['x'] === x && animal['y'] === y;
                }, ANIMALS) ? 'M' : (PLANTS[[x, y]] ? '*' : ' '));
            };
        };
        princ('|');
    };
};
function evolution() {
    drawWorld();
    freshLine();
    var str = readLine();
    if (str == 'quit') {
        return null;
    } else {
        var x = parseInteger(str, 'junk-allowed', true);
        if (x) {
            for (var i = 0; i < x; i += 1) {
                updateWorld();
                if (zerop((i % 1000 + 1000) % 1000)) {
                    princ('.');
                };
            };
        } else {
            updateWorld();
        };
        return evolution();
    };
};
import test from 'tape';

// Component to test
const Character = function (options = {}) {

    const {life = 100, weapon} = options;
    const stats = {life, weapon};

    const getLife = function () {
        return stats.life;
    };

    const getWeapon = function () {
        return stats.weapon;
    };

    return {getLife, getWeapon};
};

const Player = function (options = {}) {
    const {armor = 50} = options;
    const getArmor = function () {
        return armor;
    };

    return Object.assign(Object.create(Character()), {getArmor});
};

const Ammunition = function (options = {}) {
    const {damage = 4} = options;
    const stats = {damage};

    const getDamage = function () {
        return stats.damage;
    };

    return {damage: getDamage()};
};

const Weapon = function (options = {}) {
    const {ammo, capacity, ammoPerShot} = options;
    const stats = {ammo, capacity, ammoPerShot};

    const getStats = function () {
        return stats;
    };

    return {getStats};
};

// Tests
test('-------- Testing if player is alive ...', (assert) => {
    const message = `Retrieving player's life`;
    const expected = 100;

    const doomTrooper = Character();

    const actual = doomTrooper.getLife();

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Testing generic demon's life...`, (assert) => {
    const message = `Retrieving generic demon's life`;
    const expected = 100;

    const demon = Character();

    const actual = demon.getLife();

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Testing demon's constructor...`, (assert) => {
    const message = `Retrieving specific demon's life`;
    const expected = 50;

    const demon = Character({life: 50});

    const actual = demon.getLife();

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Testing ammunition's constructor...`, (assert) => {
    const message = `Retrieving generic ammunition's damage`;
    const expected = 4;

    const ammunition = Ammunition({damage: 4});

    const actual = ammunition.damage;

    assert.deepEqual(actual, expected, message);

    assert.end();
});

test(`-------- Testing weapon's constructor...`, (assert) => {
    const message = `Retrieving generic weapon stats`;
    const expected = {ammo: {damage: 4}, capacity: null, ammoPerShot: null};

    const ammo = Ammunition({damage: 4});
    const weapon = Weapon({ammo, capacity: null, ammoPerShot: null});

    const actual = weapon.getStats();

    assert.deepEqual(actual, expected, message);

    assert.end();
});

test(`-------- Testing demon with weapon...`, (assert) => {
    const message = `Retrieving generic weapon from a generic demon`;
    const expected = {ammo: {damage: 50}, capacity: null, ammoPerShot: null};

    const ammo = Ammunition({damage: 50});
    const weapon = Weapon({ammo, capacity: null, ammoPerShot: null});
    const demon = Character({life: 100, weapon});

    const actual = demon.getWeapon().getStats();

    assert.deepEqual(actual, expected, message);

    assert.end();
});
test(`-------- Testing player's creation...`, (assert) => {
    const message = `Retrieving generic player's life`;
    const expected = 100;

    const player = Player();

    const actual = player.getLife();

    assert.equal(actual, expected, message);

    assert.end();
});

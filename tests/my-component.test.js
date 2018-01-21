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
    const {type = 'none', damage = 4} = options;
    const stats = {type, damage};

    const getDamage = function () {
        return stats.damage;
    };

    const getType = function () {
        return stats.type;
    };

    return {damage: getDamage(), type: getType()};
};

const Weapon = function (options = {}) {
    const {ammo, ammoPerShot} = options;
    const stats = {ammo, ammoPerShot};

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
    const messageDamage = `Retrieving generic ammunition's damage`;
    const messageType = `Retrieving generic ammunition's type`;
    const expectedDamage = 4;
    const expectedType = 'none';

    const ammunition = Ammunition();

    const actualDamage = ammunition.damage;
    const actualType = ammunition.type;

    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualType, expectedType, messageType);

    assert.end();
});

test(`-------- Testing weapon's constructor...`, (assert) => {
    const message = `Retrieving generic weapon stats`;
    const expected = {ammo: {type: 'none', damage: 4}, ammoPerShot: null};

    const ammo = Ammunition({damage: 4});
    const weapon = Weapon({ammo, ammoPerShot: null});

    const actual = weapon.getStats();

    assert.deepEqual(actual, expected, message);

    assert.end();
});

test(`-------- Testing demon with weapon...`, (assert) => {
    const message = `Retrieving generic weapon from a generic demon`;
    const expected = {ammo: {type: 'none', damage: 50}, ammoPerShot: null};

    const ammo = Ammunition({damage: 50});
    const weapon = Weapon({ammo, ammoPerShot: null});
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

/*
const WEAPONS = {
    fists: {name: 'fists', ammo: Ammunition({damage: 4}), capacity: null, ammoPerShot: null},
    chainsow: {}
};
*/
/*
test(`-------- Testing weapon collection (fists)...`, (assert) => {
    const message = `Retrieving fists' characteristics from weapon's collection`;
    const expected =;

    const player = Player({armor: 50, weapons: [WEAPONS.fists, WEAPONS.chainsow]});

    const actual = player.getLife();

    assert.equal(actual, expected, message);

    assert.end();
});
*/
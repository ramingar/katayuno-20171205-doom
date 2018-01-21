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

const WEAPONS = {
    FISTS: {name: 'fists', ammo: Ammunition({damage: 15}), ammoPerShot: null},
    CHAINSAW: {name: 'chainsaw', ammo: Ammunition({damage: 30}), ammoPerShot: null},
    PISTOL: {name: 'pistol', ammo: Ammunition({type: 'bullet', damage: 15}), ammoPerShot: 1},
    SHOTGUN: {name: 'shotgun', ammo: Ammunition({type: 'shell', damage: 50}), ammoPerShot: 1},
    CHAINGUN: {name: 'chaingun', ammo: Ammunition({type: 'bullet', damage: 150}), ammoPerShot: 10},
    ROCKET_LAUNCHER: {name: 'rocketLauncher', ammo: Ammunition({type: 'rocket', damage: 200}), ammoPerShot: 1},
    PLASMAGUN: {name: 'plasmagun', ammo: Ammunition({type: 'plasma', damage: 200}), ammoPerShot: 10},
    BFG9000: {name: 'bfg9000', ammo: Ammunition({type: 'plasma', damage: 1000}), ammoPerShot: 50}
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

test(`-------- Testing weapon collection (fists)...`, (assert) => {
    const messageName = `Retrieving fists' name from weapon's collection`;
    const messageAmmunitionName = `Retrieving fists' ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving fists' damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving fists' ammo/shot from weapon's collection`;

    const expectedName = 'fists';
    const expectedAmmunitionName = 'none';
    const expectedDamage = 15;
    const expectedAmmoPerShot = null;

    const fists = WEAPONS.FISTS;

    const actualName = fists.name;
    const actualAmmunitionName = fists.ammo.type;
    const actualDamage = fists.ammo.damage;
    const actualAmmoPerShot = fists.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (chainsaw)...`, (assert) => {
    const messageName = `Retrieving chainsaw's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving chainsaw's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving chainsaw's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving chainsaw's ammo/shot from weapon's collection`;

    const expectedName = 'chainsaw';
    const expectedAmmunitionName = 'none';
    const expectedDamage = 30;
    const expectedAmmoPerShot = null;

    const chainsaw = WEAPONS.CHAINSAW;

    const actualName = chainsaw.name;
    const actualAmmunitionName = chainsaw.ammo.type;
    const actualDamage = chainsaw.ammo.damage;
    const actualAmmoPerShot = chainsaw.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (pistol)...`, (assert) => {
    const messageName = `Retrieving pistol's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving pistol's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving pistol's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving pistol's ammo/shot from weapon's collection`;

    const expectedName = 'pistol';
    const expectedAmmunitionName = 'bullet';
    const expectedDamage = 15;
    const expectedAmmoPerShot = 1;

    const pistol = WEAPONS.PISTOL;

    const actualName = pistol.name;
    const actualAmmunitionName = pistol.ammo.type;
    const actualDamage = pistol.ammo.damage;
    const actualAmmoPerShot = pistol.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (shotgun)...`, (assert) => {
    const messageName = `Retrieving shotgun's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving shotgun's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving shotgun's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving shotgun's ammo/shot from weapon's collection`;

    const expectedName = 'shotgun';
    const expectedAmmunitionName = 'shell';
    const expectedDamage = 50;
    const expectedAmmoPerShot = 1;

    const shotgun = WEAPONS.SHOTGUN;

    const actualName = shotgun.name;
    const actualAmmunitionName = shotgun.ammo.type;
    const actualDamage = shotgun.ammo.damage;
    const actualAmmoPerShot = shotgun.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (chaingun)...`, (assert) => {
    const messageName = `Retrieving chaingun's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving chaingun's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving chaingun's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving chaingun's ammo/shot from weapon's collection`;

    const expectedName = 'chaingun';
    const expectedAmmunitionName = 'bullet';
    const expectedDamage = 150;
    const expectedAmmoPerShot = 10;

    const chaingun = WEAPONS.CHAINGUN;

    const actualName = chaingun.name;
    const actualAmmunitionName = chaingun.ammo.type;
    const actualDamage = chaingun.ammo.damage;
    const actualAmmoPerShot = chaingun.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (rocket launcher)...`, (assert) => {
    const messageName = `Retrieving rocket launcher's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving rocket launcher's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving rocket launcher's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving rocket launcher's ammo/shot from weapon's collection`;

    const expectedName = 'rocketLauncher';
    const expectedAmmunitionName = 'rocket';
    const expectedDamage = 200;
    const expectedAmmoPerShot = 1;

    const rocketLauncher = WEAPONS.ROCKET_LAUNCHER;

    const actualName = rocketLauncher.name;
    const actualAmmunitionName = rocketLauncher.ammo.type;
    const actualDamage = rocketLauncher.ammo.damage;
    const actualAmmoPerShot = rocketLauncher.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (plasmagun)...`, (assert) => {
    const messageName = `Retrieving plasmagun's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving plasmagun's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving plasmagun's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving plasmagun's ammo/shot from weapon's collection`;

    const expectedName = 'plasmagun';
    const expectedAmmunitionName = 'plasma';
    const expectedDamage = 200;
    const expectedAmmoPerShot = 10;

    const plasmagun = WEAPONS.PLASMAGUN;

    const actualName = plasmagun.name;
    const actualAmmunitionName = plasmagun.ammo.type;
    const actualDamage = plasmagun.ammo.damage;
    const actualAmmoPerShot = plasmagun.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

test(`-------- Testing weapon collection (BFG 9000)...`, (assert) => {
    const messageName = `Retrieving BFG 9000's name from weapon's collection`;
    const messageAmmunitionName = `Retrieving BFG 9000's ammunition's name from weapon's collection`;
    const messageDamage = `Retrieving BFG 9000's damage from weapon's collection`;
    const messageAmmoPerShot = `Retrieving BFG 9000's ammo/shot from weapon's collection`;

    const expectedName = 'bfg9000';
    const expectedAmmunitionName = 'plasma';
    const expectedDamage = 1000;
    const expectedAmmoPerShot = 50;

    const bfg9000 = WEAPONS.BFG9000;

    const actualName = bfg9000.name;
    const actualAmmunitionName = bfg9000.ammo.type;
    const actualDamage = bfg9000.ammo.damage;
    const actualAmmoPerShot = bfg9000.ammoPerShot;

    assert.equal(actualName, expectedName, messageName);
    assert.equal(actualAmmunitionName, expectedAmmunitionName, messageAmmunitionName);
    assert.equal(actualDamage, expectedDamage, messageDamage);
    assert.equal(actualAmmoPerShot, expectedAmmoPerShot, messageAmmoPerShot);

    assert.end();
});

import test from 'tape';

// Component to test
const Character = function ( options = {}) {

    let life = options.life || 100;

    const getLife = function () {
        return life;
    };

    return {getLife}
};

const Weapon = function ( options = {}) {

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

test(`-------- Testing weapon's constructor...`, (assert) => {
    const message = `Retrieving generic weapon stats`;
    const expected = {ammo: null, capacity: null, ammoPerShot: null, damage: 4};

    const weapon = Weapon({ammo: null, capacity: null, ammoPerShot: null, damage: 4});

    const actual = weapon.getStats();

    assert.equal(actual, expected, message);

    assert.end();
});

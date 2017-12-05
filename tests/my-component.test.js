import test from 'tape';

// Component to test

// Tests
test('-------- Component: test ...', (assert) => {
    const message = 'Message when error';
    const expected = 1;

    const actual = 'component return';

    assert.equal(actual, expected, message);

    assert.end();
});

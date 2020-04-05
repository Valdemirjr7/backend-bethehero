const generateUniqueid = require('../../src/utils/generateUniqueid');

describe('Generate Unique ID', () => {
    it('Should generate an unique ID', () => {
        const id = generateUniqueid();
        expect(id).toHaveLength(8);
    });
});
const InvertedIndex = require('../src/inverted-index.js'),
    books = require('../fixtures/books.json');

describe('InvertedIndex', () => {
    const inverted = new InvertedIndex();
    it('should return true for the instance of the class', () => {
        expect(inverted instanceof InvertedIndex).toBeTruthy();
    });

    describe('Read book data', () => {
        it('should check that the file content is a valid json file', () => {
            expect(inverted.isValidJson(books)).toBeTruthy();
        });

        it('return false if the content of the file is empty', () => {
            expect(inverted.isValidJson([])).toBeFalsy();
        });

        it('should false if the file is invalid', () => {
            expect(inverted.isValidJson('String data')).toBeFalsy();
            expect(inverted.isValidJson(123)).toBeFalsy();
        });
    });

    describe('Populate index', () => {
        inverted.createIndex(books, 'books');
        it('should verify that index has been created', () => {
            expect(Object.keys(inverted.getIndex('books')).length).toBeGreaterThan(0);
        });

        it('should check that index maps the string to the correct objects in json array', () => {
            expect(inverted.getIndex('books').index.alice).toEqual([0]);
        });

    });

    describe('Search Index', () => {
        it('Ensures index returns the correct results when searched', () => {
            expect(inverted.searchIndex('of', 'books')).toEqual({ books: { index: { of: [0, 1] }, length: 2 } });
            expect(inverted.searchIndex('alice ring', 'books')).toEqual({ books: { index: { alice: [0], ring: [1] }, length: 2 } });
        });

        it('Ensure searchIndex can handle an array of search terms', () => {
            expect(inverted.searchIndex(['alice', 'in'], 'books')).toEqual({ books: { index: { alice: [0], in: [0] }, length: 2 } });
            expect(inverted.searchIndex(['chris', 'in', 'andela'], 'books')).toEqual({ books: { index: { in: [0] }, length: 2 } });
        });

        it('Ensure searchIndex can handle a multidimensional array of search terms', () => {
            expect(inverted.searchIndex(['powerful', ['wonderland', ['into', 'a']], 'seek'], 'books'))
            .toEqual({ books: { index: { powerful: [1], wonderland: [0], into: [0], a: [0, 1], seek: [1] }, length: 2 } });
        });

        it('should return search result if a file name is not specified', () => {
            expect(inverted.searchIndex(['alice', 'in'])).toEqual({ books: { index: { alice: [0], in: [0] }, length: 2 } });
            expect(inverted.searchIndex('chris in lagos')).toEqual({ file1: { index: { in: [0] }, length: 2 } });
        });

    });

});
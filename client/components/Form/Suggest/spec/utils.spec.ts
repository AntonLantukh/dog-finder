import {stringify} from '../utils';

describe('stringify', () => {
    it('Stringifies several options', () => {
        const str = stringify(['a', 'b', 'c']);

        expect(str).toEqual('a, b, c');
    });

    it('Stringifies one option', () => {
        const str = stringify(['a']);

        expect(str).toEqual('a');
    });
});

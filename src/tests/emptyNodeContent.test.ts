import { emptyNodeContent } from '../utils/emptyNodeContent';

describe('emptyNodeContent', () => {
  test('Empty array', () => {
    expect(emptyNodeContent([])).toEqual(true);
  });

  test('Line break or empty string', () => {
    // @ts-ignore
    expect(emptyNodeContent([''])).toEqual(true);
    // @ts-ignore
    expect(emptyNodeContent([' '])).toEqual(true);
    // @ts-ignore
    expect(emptyNodeContent(['\n'])).toEqual(true);
  });

  test('Non-empty string', () => {
    expect(emptyNodeContent([{ tag: 'div' }])).toEqual(false);
  });

  test('Object', () => {
    expect(emptyNodeContent([{ tag: 'div' }])).toEqual(false);
  });
});

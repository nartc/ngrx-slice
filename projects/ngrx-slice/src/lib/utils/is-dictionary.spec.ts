import { isDictionary } from './is-dictionary';

describe(isDictionary.name, () => {
  it('should assert', () => {
    expect(isDictionary({})).toEqual(true);
    expect(isDictionary({ foo: 'bar' })).toEqual(true);
    expect(isDictionary([])).toEqual(false);
    expect(isDictionary([{ foo: 'bar' }])).toEqual(false);
    expect(isDictionary(new Date())).toEqual(false);
    expect(isDictionary('string')).toEqual(false);
    expect(isDictionary(123)).toEqual(false);
    expect(isDictionary(true)).toEqual(false);
    expect(isDictionary(undefined)).toEqual(false);
    expect(isDictionary(null)).toEqual(false);
  });
});

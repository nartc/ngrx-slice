import { capitalize } from './capitalize';

describe(capitalize.name, () => {
  it('should capitalize', () => {
    expect(capitalize('string')).toEqual('String');
    expect(capitalize('camelCase')).toEqual('CamelCase');
    expect(capitalize('another-string')).toEqual('Another-string');
  });
});

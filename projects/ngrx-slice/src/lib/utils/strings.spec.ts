import { capitalize, classify } from './strings';

describe('strings', () => {
  describe(capitalize.name, () => {
    it('should capitalize', () => {
      expect(capitalize('string')).toEqual('String');
      expect(capitalize('camelCase')).toEqual('CamelCase');
      expect(capitalize('another-string')).toEqual('Another-string');
    });
  });

  describe(classify.name, () => {
    it('should classify', () => {
      expect(classify('foo')).toEqual('Foo');
      expect(classify('foo bar')).toEqual('FooBar');
      expect(classify('fooBar')).toEqual('FooBar');
      expect(classify('foo-Bar')).toEqual('FooBar');
      expect(classify('foo-bar')).toEqual('FooBar');
      expect(classify('Foo-bar')).toEqual('FooBar');
      expect(classify('Foobar')).toEqual('Foobar');
    });
  });
});

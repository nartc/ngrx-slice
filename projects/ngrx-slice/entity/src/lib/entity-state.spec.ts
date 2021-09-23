import { createInitialStateFactory } from './entity-state';

describe(createInitialStateFactory.name, () => {
  it('should return getInitialState function', () => {
    const result = createInitialStateFactory();
    expect(result.getInitialState).toBeTruthy();
    expect(result.getInitialState).toBeInstanceOf(Function);
  });

  describe('getInitialState', () => {
    const { getInitialState } = createInitialStateFactory();

    it('should return initial state', () => {
      const result = getInitialState();
      expect(result).toEqual({ ids: [], entities: {} });
    });

    it('should return merged state with additional state', () => {
      const result = getInitialState({ foo: 'foo', bar: 123 });
      expect(result).toEqual({ ids: [], entities: {}, foo: 'foo', bar: 123 });
    });
  });
});

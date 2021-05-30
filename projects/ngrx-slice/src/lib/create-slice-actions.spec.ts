import { createSliceActions } from './create-slice-actions';
import { PayloadAction } from './typings';

const getter = (featureName: string, actionName: string) =>
  featureName + '/' + actionName;

describe(createSliceActions.name, () => {
  it('should return empty {} if reducers is empty', () => {
    expect(createSliceActions('feature', getter, {})).toEqual({});
  });

  it('should return actions for case reducers', () => {
    const actions = createSliceActions('feature', getter, {
      foo: (state) => state,
      bar: (state) => state,
    });
    expect(Object.keys(actions).length).toEqual(2);
    ['foo', 'bar'].forEach((key) => {
      expect((actions as Record<string, Function>)[key]).toBeTruthy();
      expect((actions as Record<string, Function>)[key]()).toEqual({
        type: 'feature/' + key,
      });
    });
  });

  it('should return actions for async case reducers', () => {
    const actions = createSliceActions('feature', getter, {
      foo: {
        success: (state) => state,
        trigger: (state) => state,
      },
      bar: {
        success: (state) => state,
        failure: (state) => state,
      },
    });

    expect(Object.keys(actions).length).toEqual(2);
    ['foo', 'bar'].forEach((key) => {
      const action = (actions as Record<string, any>)[key];
      expect(action).toBeTruthy();
      expect(Object.keys(action).length).toEqual(3);
      expect(action['success']()).toEqual({ type: `feature/${key} success` });
      expect(action['trigger']()).toEqual({ type: `feature/${key} trigger` });
      expect(action['failure']()).toEqual({ type: `feature/${key} failure` });
    });
  });

  it('should return actions with payload', () => {
    const actions = createSliceActions('feature', getter, {
      foo: (state, _: PayloadAction<{ foo: string }>) => state,
      bar: {
        success: (state) => state,
        trigger: (state, _: PayloadAction<{ bar: string }>) => state,
      },
    });

    expect(Object.keys(actions).length).toEqual(2);
    ['foo', 'bar'].forEach((key) => {
      const action = (actions as Record<string, any>)[key];
      expect(action).toBeTruthy();
      if (key === 'foo') {
        expect(action({ foo: 'foo' })).toEqual({
          type: 'feature/foo',
          foo: 'foo',
        });
      } else if (key === 'bar') {
        expect(action['trigger']({ bar: 'bar' })).toEqual({
          type: 'feature/bar trigger',
          bar: 'bar',
        });
      }
    });
  });
});
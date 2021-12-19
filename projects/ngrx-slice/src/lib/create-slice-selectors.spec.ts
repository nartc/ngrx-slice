import { createFeatureSelector } from '@ngrx/store';
import { createSliceSelectors } from './create-slice-selectors';
import { classify } from './utils';

describe(createSliceSelectors.name, () => {
  it('should create selectors', () => {
    const initialState = {
      count: 0,
      increment: 0,
      decrement: 0,
    };

    const featureSelector =
      createFeatureSelector<typeof initialState>('counter');

    const selectors = createSliceSelectors<typeof initialState>(
      initialState,
      featureSelector
    );

    expect(Object.keys(selectors).length).toEqual(3);
    Object.keys(initialState).forEach((stateKey) => {
      expect(
        (selectors as Record<string, unknown>)[`select${classify(stateKey)}`]
      ).toBeTruthy();
    });
  });

  it('should return empty {} for empty state', () => {
    const featureSelector = createFeatureSelector<object>('counter');
    const selectors = createSliceSelectors({}, featureSelector);
    expect(Object.keys(selectors).length).toEqual(0);
  });

  it('should return empty {} for non object state', () => {
    const featureSelector = createFeatureSelector<object>('counter');
    const selectors = createSliceSelectors(0 as any, featureSelector);
    expect(Object.keys(selectors).length).toEqual(0);
  });
});

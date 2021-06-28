import { on } from '@ngrx/store';
import { triple } from 'path/to/external';

const { CounterActions, CounterSelectors, CounterFeature } = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /* ... */
  },
  extraReducers: [
    on<CounterState, [typeof triple]>(triple, (state) => ({
      ...state,
      value: state.value * 3,
    })),
  ],
});

## [5.0.0](https://github.com/nartc/ngrx-slice/compare/4.0.0...5.0.0) (2021-10-22)


### ⚠ BREAKING CHANGES

* generated actions for AsyncCaseReducer are now
correctly generated with the type of cases provided, not all 5

```ts
const { actions } = createSlice({
  name: 'foo',
  initialState,
  reducers: {
    foo: {
      success: state => state,
      trigger: noopReducer()
    }
  }
});

// before
assert(Object.keys(actions.foo).length === 5); // Actions for all 5 cases are generated 

// after
assert(Object.keys(actions.foo).length === 2); // Only the "success" and "trigger" cases are generated
```

### Features

* only generate correct amount of async case actions ([c250f2a](https://github.com/nartc/ngrx-slice/commit/c250f2afcae216d64e0c155e038d37d25727b15e))


### Documentations

* remove scully plugins folder ([de0a678](https://github.com/nartc/ngrx-slice/commit/de0a67812616a7e297ffc50b32aed2650c652745))

## [4.0.0](https://github.com/nartc/ngrx-slice/compare/3.1.1...4.0.0) (2021-09-27)


### Features

* add noop() to actions for triggering effects ([55a1df7](https://github.com/nartc/ngrx-slice/commit/55a1df71cd3721099a19628da724cb9679f160ab))
* **entity:** simplify `updateOne` usage ([62e0619](https://github.com/nartc/ngrx-slice/commit/62e061988cccafcf93c2d8c834001b394d787905))

### ⚠ BREAKING CHANGES: `updateOne` now accepts `Update<TModel>` instead of `{ update: Update<TModel> }`
```ts
// before
TodoActions.toggleComplete({
    update: {
        id: todo.id,
        changes: { completed: !todo.completed }
    }
});

// after
TodoActions.toggleComplete({
    id: todo.id,
    changes: { completed: !todo.completed }
});
```

### Bug Fixes

* **entity:** check if arg is object for payloadAction ([eb8bfbb](https://github.com/nartc/ngrx-slice/commit/eb8bfbb51b6b3c83910edcd1fcfb086cf74eb216))

### [3.1.1](https://github.com/nartc/ngrx-slice/compare/3.1.0...3.1.1) (2021-09-10)


### Bug Fixes

* PayloadAction type ([62e56e6](https://github.com/nartc/ngrx-slice/commit/62e56e65a5d1e16b3721d77934824e45b0521841))

## [3.1.0](https://github.com/nartc/ngrx-slice/compare/3.0.0...3.1.0) (2021-09-02)


### Features

* port strings utils from angular to support classify instead of capitalize ([4e1e4cb](https://github.com/nartc/ngrx-slice/commit/4e1e4cb20402b606b96ec64698fab6384f234bf3))

## [3.0.0](https://github.com/nartc/ngrx-slice/compare/2.2.0...3.0.0) (2021-08-27)


### ⚠ BREAKING CHANGES

* **entity:** Dictionary no longer has undefined defined

```ts
// before
state.entities[id]; // returns entity or undefined

// after
state.entities[id]; // returns entity 
```

You should make sure that it is `IMPOSSIBLE` to access the entity at some given `id` if the `entity` is undefined. Eg: via UI, undefined entity shouldn't be rendered.

* noopReducer usage has been simplified. The type parameters (`ActionProps` and `SliceState`) have been switched

```ts
// before
noopReducer<TodoState, { filter: Filter }>();
noopReducer<TodoState>();

// after
noopReducer<{filter: Filter}>();
noopReducer();
```

### Bug Fixes

* adjust noopReducer implementation ([34d65c3](https://github.com/nartc/ngrx-slice/commit/34d65c390fb18535b53ce9aadc27fe8009c605d6))
* **entity:** remove undefined from Dictionary type ([fa538eb](https://github.com/nartc/ngrx-slice/commit/fa538eb16327b1f33b925139aba315ded48f5ecf))

## [2.2.0](https://github.com/nartc/ngrx-slice/compare/2.1.1...2.2.0) (2021-08-26)


### Features

* **entity:** add createSliceEntityAdapter ([4d68582](https://github.com/nartc/ngrx-slice/commit/4d68582cf32152f58f9887ee2dbbb60a0ff9d71e))

### [2.1.1](https://github.com/nartc/ngrx-slice/compare/2.1.0...2.1.1) (2021-07-19)


### Bug Fixes

* use proper type fo createSliceAction ([d8334fd](https://github.com/nartc/ngrx-slice/commit/d8334fd0b5be27d55b3c1c40794fb6345c8e966e))


### Documentations

* add angular to npm keywords ([3d00843](https://github.com/nartc/ngrx-slice/commit/3d00843e89a4a0f1c292b59d5b756a935ecbff36))
* fix readme ([3a013c3](https://github.com/nartc/ngrx-slice/commit/3a013c3c84f87087bcd05f4d3e7f5f1e1e38dd73))

## [2.1.0](https://github.com/nartc/ngrx-slice/compare/2.0.0...2.1.0) (2021-06-28)


### Features

* add createNamespacedSlice in addition to createSlice ([71ef0f1](https://github.com/nartc/ngrx-slice/commit/71ef0f1bbfabdd90c88c64fb2ab433943b297326))


### Documentations

* clean up docs ([9bbe224](https://github.com/nartc/ngrx-slice/commit/9bbe2242f1d052f61b8b09984869736126a5e3d1))

## [2.0.0](https://github.com/nartc/ngrx-slice/compare/1.1.0...2.0.0) (2021-06-28)


### ⚠ BREAKING CHANGES

* `createSlice` now returns a more opinionated object based on the `name` of the Slice.

```ts
// before
export const {actions, selectors, name, reducer} = createSlice({name: 'counter'})

// after
export const {CounterActions, CounterSelectors, CounterFeature} = createSlice({name: 'counter'})
```

`name` of `SliceOptions` is now utilized to make the return type of `createSlice` to have better namespacing.
This has the downside of the `name` has to be `camelCase`.

* `typedNoopReducer` has been removed. Use `noopReducer` instead

```ts
// before
noopReducer<CounterState>();
typedNoopReducer<CounterState, {multiplier: number}>();

// after
noopReducer<CounterState>();
noopReducer<CounterState, {multiplier: number}>();
```

### Features

* clean up API ([95312f6](https://github.com/nartc/ngrx-slice/commit/95312f606628080cd809752c63f3929af9d84db7))


### Documentations

* add netlify status badge ([6749bca](https://github.com/nartc/ngrx-slice/commit/6749bcaed3baa089b62620ffa9799651ed6325ff))
* update docs to reflect updated API ([9311408](https://github.com/nartc/ngrx-slice/commit/931140875ed2bade633b2bfa7116277193b4b6cf))

## [1.1.0](https://github.com/nartc/ngrx-slice/compare/1.0.1...1.1.0) (2021-06-11)


### Features

* add clear and cancel to AsyncCaseReducers ([605b0fe](https://github.com/nartc/ngrx-slice/commit/605b0fe9b6b14e5afc85109314c7874ba9895c8c))
* move immer and ngrx-immer to peerDeps ([e21c7d7](https://github.com/nartc/ngrx-slice/commit/e21c7d7fbd5daae907529759d468605a33b587cf))


### Refactor

* extract Async Action types to an const array ([519c336](https://github.com/nartc/ngrx-slice/commit/519c3363ffa6737a1b48ee131c90f387987c352f))


### Documentations

* update docs about clear and cancel async case reducer ([0b339b0](https://github.com/nartc/ngrx-slice/commit/0b339b084d214a67ba905ec0fe231a73f8ea0023))
* use tuiLink for links and adjust Counter Example docs ([26e51a6](https://github.com/nartc/ngrx-slice/commit/26e51a678017fb6d9e9b4ea2a8311ee17c563d8b))

### [1.0.1](https://github.com/nartc/ngrx-slice/compare/1.0.0...1.0.1) (2021-06-06)


### Documentations

* add docs application and taiga ui ([6451339](https://github.com/nartc/ngrx-slice/commit/645133961d3593313d832858aff7e6de14a09414))
* add scully ([b8a23dc](https://github.com/nartc/ngrx-slice/commit/b8a23dc032842d24428c55bb8e17e58daf9f56bd))
* adjust docs import ([7d435f1](https://github.com/nartc/ngrx-slice/commit/7d435f1343b780664dcbd3794ac255e8cbf4b8dc))
* basic documentations added ([9cd410c](https://github.com/nartc/ngrx-slice/commit/9cd410c51970a8e533b335d5c152670b83151ae4))
* finish docs ([8abb8dc](https://github.com/nartc/ngrx-slice/commit/8abb8dca60a069cd651c3ebb08a24172d4e8ae6e))

## 1.0.0 (2021-06-06)


### Features

* add README and bump version ([c27820b](https://github.com/nartc/ngrx-slice/commit/c27820b4dd736c9e30221eaeea5672e12502e54b))
* poc createSlice ([bbf50a6](https://github.com/nartc/ngrx-slice/commit/bbf50a6434fea207b5c3d6ac9f29192862a00875))


### Bug Fixes

* bump version ([684b01c](https://github.com/nartc/ngrx-slice/commit/684b01c0e7b2bda88f4b1165ce0b02db8129dfde))
* change AppState from unknown to any. ngrx uses object as store type ([8d79352](https://github.com/nartc/ngrx-slice/commit/8d79352cd7097d3f1b9a8334f7d7893b6ab093a1))
* change AppState from unknown to any. ngrx uses object as store type ([f5bd2ea](https://github.com/nartc/ngrx-slice/commit/f5bd2ead8fade1b78f2948e2af125e84f6a537f4))
* change PayloadAction from unknown to any ([366c988](https://github.com/nartc/ngrx-slice/commit/366c98804265a06cee6cee08ebce383a1de265ed))
* change PayloadAction from unknown to any ([958691f](https://github.com/nartc/ngrx-slice/commit/958691f08f1623865c17a0954b7b9ec04719ae9a))
* fix payloadAction typings ([9a46fe3](https://github.com/nartc/ngrx-slice/commit/9a46fe3f2568860369d00791802280b4a1e1c6e8))
* fix typedNoopReducer type ([a234342](https://github.com/nartc/ngrx-slice/commit/a23434251f7a4788a7db9f9dd2b10dce6602822f))
* fix typings around payload action ([a876d32](https://github.com/nartc/ngrx-slice/commit/a876d3255fa0c674e19d3af02fced24738c0e5d8))


### Documentations

* add LICENSE ([eee5f6b](https://github.com/nartc/ngrx-slice/commit/eee5f6b907503075ae6ba418313f5f74d722f69b))
* readme ([bff72d5](https://github.com/nartc/ngrx-slice/commit/bff72d5db99d304709100fd2fc48c8743cb711e2))


### Refactor

* remove NonOptional type ([9a9b191](https://github.com/nartc/ngrx-slice/commit/9a9b191cd575a22a49d2cdaf3c531e65b44edbae))


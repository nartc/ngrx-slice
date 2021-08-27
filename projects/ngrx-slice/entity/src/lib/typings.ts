import type { PayloadAction } from 'ngrx-slice';

/**
 * return True if T is `any`, otherwise return False
 * taken from https://github.com/joonhocho/tsdef
 *
 * @internal
 */
export type IsAny<T, True, False = never> =
  // test if we are going the left AND right path in the condition
  true | false extends (T extends never ? true : false) ? True : False;

export type EntityId = string | number;

export type IdSelector<TModel> = (model: TModel) => EntityId;

export type Comparer<TData> = (a: TData, b: TData) => number;

export interface DictionaryNum<TData> {
  [id: number]: TData;
}

export interface Dictionary<TData> extends DictionaryNum<TData> {
  [id: string]: TData;
}

export interface Update<TData> {
  id: EntityId;
  changes: Partial<TData>;
}

export type Predicate<TEntity> = (entity: TEntity) => boolean;

export type EntityMap<TEntity> = (entity: TEntity) => TEntity;

export interface EntityMapOne<TEntity> {
  id: EntityId;
  map: EntityMap<TEntity>;
}

export interface EntityState<TData> {
  ids: EntityId[];
  entities: Dictionary<TData>;
}

export interface EntityDefinition<TData> {
  selectId: IdSelector<TData>;
  sortComparer: false | Comparer<TData>;
}

export type PreventAny<S, T> = IsAny<S, EntityState<T>, S>;

export interface EntityStateAdapter<TData> {
  addOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entity: TData
  ): TState;

  addOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ entity: TData }>
  ): TState;

  addMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entities: readonly TData[] | Record<EntityId, TData>
  ): TState;

  addMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{
      entities: readonly TData[] | Record<EntityId, TData>;
    }>
  ): TState;

  setOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entity: TData
  ): TState;

  setOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ entity: TData }>
  ): TState;

  setMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entities: readonly TData[] | Record<EntityId, TData>
  ): TState;

  setMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{
      entities: readonly TData[] | Record<EntityId, TData>;
    }>
  ): TState;

  setAll<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entities: readonly TData[] | Record<EntityId, TData>
  ): TState;

  setAll<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{
      entities: readonly TData[] | Record<EntityId, TData>;
    }>
  ): TState;

  removeOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    key: EntityId
  ): TState;

  removeOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ key: EntityId }>
  ): TState;

  removeMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    keys: EntityId[]
  ): TState;

  removeMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ keys: EntityId[] }>
  ): TState;

  removeAll<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>
  ): TState;

  updateOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    update: Update<TData>
  ): TState;

  updateOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ update: Update<TData> }>
  ): TState;

  updateMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    updates: ReadonlyArray<Update<TData>>
  ): TState;

  updateMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ updates: ReadonlyArray<Update<TData>> }>
  ): TState;

  upsertOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entity: TData
  ): TState;

  upsertOne<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{ entity: TData }>
  ): TState;

  upsertMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    entities: readonly TData[] | Record<EntityId, TData>
  ): TState;

  upsertMany<TState extends EntityState<TData>>(
    state: PreventAny<TState, TData>,
    action: PayloadAction<{
      entities: readonly TData[] | Record<EntityId, TData>;
    }>
  ): TState;
}

export interface EntitySelectors<TData, TState> {
  selectIds: (state: TState) => EntityId[];
  selectEntities: (state: TState) => Dictionary<TData>;
  selectAll: (state: TState) => TData[];
  selectTotal: (state: TState) => number;
}

export interface EntityAdapter<TData> extends EntityStateAdapter<TData> {
  selectId: IdSelector<TData>;
  sortComparer: false | Comparer<TData>;

  getInitialState(): EntityState<TData>;

  getInitialState<TState extends object>(
    state: TState
  ): EntityState<TData> & TState;

  getSelectors(): EntitySelectors<TData, EntityState<TData>>;

  getSelectors<TState>(
    selectState: (state: TState) => EntityState<TData>
  ): EntitySelectors<TData, TState>;
}

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import {environment} from '../../environments/environment';
import * as fromApp from './app.reducer';

export interface State {
  app: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectApp = createFeatureSelector<State, fromApp.State>('app');
export const selectAppError = createSelector(selectApp, (state: fromApp.State) => state.error);
export const selectAppFeatures = createSelector(selectApp, (state: fromApp.State) => state.features);
export const selectAppInstantiated = createSelector(selectApp, (state: fromApp.State) => state.instantiated);
export const selectAppSession = createSelector(selectApp, (state: fromApp.State) => state.session);

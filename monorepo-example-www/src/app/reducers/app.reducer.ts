import {SessionModel} from '@monorepo-example/shared';

import {AppActions, AppActionTypes} from '../actions/app.actions';

export interface State {
  error: string;
  features: string[];
  instantiated: boolean;
  session: SessionModel;
}

export const initialState: State = {
  error: null,
  features: null,
  instantiated: null,
  session: null,
};

export function reducer(state = initialState, action: AppActions): State {

  switch (action.type) {

    case AppActionTypes.LoadInitialAppConfig: {
      if (action.payload.session === undefined) {
        return {
          ...state,
          error: 'Session information was not provided.',
          instantiated: true,
        };
      }
      if (action.payload.features === undefined) {
        return {
          ...state,
          error: 'Features were not provided.',
          instantiated: true,
        };
      }
      return {
        ...state,
        features: action.payload.features,
        instantiated: true,
        session: action.payload.session,
      };
    }

    default:
      return state;
  }
}



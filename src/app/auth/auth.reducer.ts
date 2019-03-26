import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface State {
  isAuthenticated: boolean;
  user: User;
}

const initState: State = {
  isAuthenticated: false,
  user: null
};

export function authReducer(state = initState, action: fromAuth.actions): State {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        ...state,
        isAuthenticated: action.user !== null,
        user: action.user !== null ? { ...action.user } : null
      };
    default:
      return state;
  }
}

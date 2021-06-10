import { Dispatch, Middleware } from 'redux';

export const ChartersMiddleware: Middleware =
  () =>
  (next) =>
  (action): Dispatch => {
    return next(action);
  };
